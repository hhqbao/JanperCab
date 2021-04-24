using _1_Domain;
using _3_Application.Dtos.UploadFile;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public FilesController(IWebHostEnvironment hostEnvironment, IUnitOfWork unitOfWork, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _hostEnvironment = hostEnvironment;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpPost("DuraformFiles/Upload/{id}")]
        public async Task<IActionResult> UploadDuraformFiles(int id, [FromForm] List<UploadDuraformFileDto> uploadFiles)
        {
            if (uploadFiles.Count == 0)
                return Ok();

            var creator = await _userManager.FindByEmailAsync(User.Identity.Name);
            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, creator.Customer);

            if (!(enquiry is DuraformEnquiry))
                return BadRequest("Duraform Enquiry Not Found");

            var root = _hostEnvironment.WebRootPath;
            var path = Path.Combine(root, "Files", "Duraform");
            var fileFolder = Path.Combine(path, enquiry.Id.ToString());

            Directory.CreateDirectory(fileFolder);

            foreach (var file in uploadFiles)
            {
                if (file.File.Length <= 0) continue;

                var duraformFile = _mapper.Map<UploadDuraformFileDto, DuraformFile>(file);
                duraformFile.DuraformEnquiryId = enquiry.Id;

                _unitOfWork.ApplicationFiles.Add(duraformFile);
                await _unitOfWork.CompleteAsync();

                var fileExtension = Path.GetExtension(file.File.FileName);

                await using var fileStream = new FileStream(Path.Combine(fileFolder, $"{duraformFile.Id}{fileExtension}"), FileMode.Create);
                await file.File.CopyToAsync(fileStream);
            }

            return Ok();
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpGet("DuraformFiles/Download/{id}")]
        public async Task<IActionResult> DownloadDuraformFile(Guid id)
        {
            var file = await _unitOfWork.ApplicationFiles.GetDuraformFileAsync(id);

            if (file == null)
                return BadRequest("File Data Not Found");

            var fileExtension = Path.GetExtension(file.FileName);
            var root = _hostEnvironment.WebRootPath;
            var filePath = Path.Combine(root, "Files", "Duraform", file.DuraformEnquiryId.ToString(), $"{file.Id}{fileExtension}");

            if (!System.IO.File.Exists(filePath))
                return BadRequest("Physical File Not Found");

            try
            {

                var memory = new MemoryStream();
                await using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }

                memory.Position = 0;
                return File(memory, file.FileType, file.FileName);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpDelete("DuraformFiles/Delete/{id}")]
        public async Task<IActionResult> DeleteDuraformFile(Guid id)
        {
            var file = await _unitOfWork.ApplicationFiles.GetDuraformFileAsync(id);

            if (file == null)
                return BadRequest("File Data Not Found");

            _unitOfWork.ApplicationFiles.Remove(file);
            await _unitOfWork.CompleteAsync();

            var fileExtension = Path.GetExtension(file.FileName);
            var root = _hostEnvironment.WebRootPath;
            var filePath = Path.Combine(root, "Files", "Duraform", file.DuraformEnquiryId.ToString(), $"{file.Id}{fileExtension}");

            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);

            return Ok();
        }
    }
}
