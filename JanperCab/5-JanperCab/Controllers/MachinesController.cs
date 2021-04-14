using _1_Domain;
using _3_Application.Dtos.Machine;
using _3_Application.Interfaces.Repositories;
using _3_Application.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMachineFileGenerator _fileGenerator;
        private readonly IConfiguration _config;

        public MachinesController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<ApplicationUser> userManager, IMachineFileGenerator fileGenerator, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _fileGenerator = fileGenerator;
            _config = config;
        }

        [HttpPost("icb-export/duraform/{id}")]
        public async Task<IActionResult> ExportDuraformIcb(int id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, currentUser.Customer);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            await _fileGenerator.ExportICBFileAsync(duraformEnquiry, _config.GetSection("AppSettings:IcbFileLocation").Value);

            return Ok();
        }

        [HttpGet("productions")]
        public async Task<IActionResult> Productions()
        {
            var machines = await _unitOfWork.Machines.GetAllAsync();

            return Ok(_mapper.Map<List<Machine>, List<MachineProductionListDto>>(machines));
        }
    }
}
