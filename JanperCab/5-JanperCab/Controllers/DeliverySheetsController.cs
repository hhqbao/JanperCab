using _1_Domain;
using _3_Application.Dtos.DeliverySheet;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class DeliverySheetsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public DeliverySheetsController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize(Roles = "Driver,Sale")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sheets = await _unitOfWork.DeliverySheets.GetAllAsync(x => !x.CompletedDate.HasValue);

            return Ok(_mapper.Map<List<DeliverySheet>, List<DeliverySheetDto>>(sheets));
        }

        [Authorize(Roles = "Driver,Sale")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(id);

            if (sheet == null)
                return BadRequest("Delivery Sheet Not Found");

            return Ok(_mapper.Map<DeliverySheet, DeliverySheetDto>(sheet));
        }

        [Authorize(Roles = "Driver")]
        [HttpPost]
        public async Task<IActionResult> Create(DeliverySheetDto sheetDto)
        {
            var newSheet = _mapper.Map<DeliverySheetDto, DeliverySheet>(sheetDto);

            if (newSheet is PickUpSheet pickUpSheet)
            {
                var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

                pickUpSheet.ApplicationUserId = currentUser.Id;
            }

            _unitOfWork.DeliverySheets.Add(newSheet);
            await _unitOfWork.CompleteAsync();

            _unitOfWork.DeliverySheets.Detach(newSheet);
            newSheet = await _unitOfWork.DeliverySheets.GetAsync(newSheet.Id);

            return Ok(_mapper.Map<DeliverySheet, DeliverySheetDto>(newSheet));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DeliverySheetDto sheetDto)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(id);

            if (sheet == null) return BadRequest("Delivery Sheet Not Found");

            if (!sheet.IsEditable) return BadRequest("Delivery Sheet Is Locked! Cannot Be Changed");

            _mapper.Map(sheetDto, sheet);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<DeliverySheet, DeliverySheetDto>(sheet));
        }

        [Authorize(Roles = "Driver")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(id);

            if (sheet == null)
                return BadRequest("Sheet Not Found");

            if (sheet.CompletedDate.HasValue)
                return BadRequest("Sheet Already Completed! Cannot Delete");

            var enquiries = sheet.ProcessDeliverings.Select(x => x.Enquiry).ToList();

            foreach (var enquiry in enquiries)
            {
                enquiry.UndoDelivering();
            }

            _unitOfWork.DeliverySheets.Remove(sheet);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("lock/{id}")]
        public async Task<IActionResult> Lock(int id)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(id);

            if (sheet == null) return BadRequest("Delivery Sheet Not Found");

            if (sheet.ProcessDeliverings.Count == 0)
                return BadRequest("At least 1 order required");

            if (!sheet.IsEditable) return BadRequest("Delivery Sheet No Longer Editable");

            sheet.LockedDate = DateTime.Now;
            await _unitOfWork.CompleteAsync();

            return Ok(sheet.LockedDate.Value);
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("complete/{id}")]
        public async Task<IActionResult> ConfirmDelivery(int id)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(id);

            if (sheet == null) return BadRequest("Delivery Sheet Not Found");

            if (sheet.CompletedDate.HasValue)
                return BadRequest($"Delivery Sheet was completed on {sheet.CompletedDate.Value:dd/MM/yyyy hh:mm}");

            sheet.Complete();
            await _unitOfWork.CompleteAsync();

            return Ok(sheet.CompletedDate);
        }
    }
}
