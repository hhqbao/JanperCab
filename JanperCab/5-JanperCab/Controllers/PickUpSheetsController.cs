using _1_Domain;
using _3_Application.Dtos.PickUpSheet;
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
    public class PickUpSheetsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PickUpSheetsController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Driver,Sale")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sheets = await _unitOfWork.PickUpSheets.GetAllAsync(x => x.CreatedDate.AddDays(5) >= DateTime.Now);

            return Ok(_mapper.Map<List<PickUpSheet>, List<PickUpSheetForListDto>>(sheets.OrderBy(x => x.IsCompleted).ToList()));
        }

        [Authorize(Roles = "Driver,Sale")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var sheet = await _unitOfWork.PickUpSheets.GetAsync(id);

            return Ok(_mapper.Map<PickUpSheet, PickUpSheetForListDto>(sheet));
        }

        [Authorize(Roles = "Driver")]
        [HttpPost("{customerId}")]
        public async Task<IActionResult> Create(int customerid)
        {
            var customer = await _unitOfWork.Customers.GetAsync(customerid);

            if (customer == null)
                return BadRequest("Customer Not Found");

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var newSheet = new PickUpSheet { CustomerId = customer.Id, ApplicationUserId = currentUser.Id };
            _unitOfWork.PickUpSheets.Add(newSheet);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<PickUpSheet, PickUpSheetForListDto>(newSheet));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("complete/{sheetId}")]
        public async Task<IActionResult> CompleteSheet(int sheetId)
        {
            var sheet = await _unitOfWork.PickUpSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Sheet Not Found");

            if (sheet.IsCompleted)
                return BadRequest("Sheet Already Completed");

            sheet.Complete();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [Authorize(Roles = "Driver")]
        [HttpDelete("{sheetId}")]
        public async Task<IActionResult> DeleteSheet(int sheetId)
        {
            var sheet = await _unitOfWork.PickUpSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Sheet Not Found");

            if (sheet.IsCompleted)
                return BadRequest("Sheet Already Completed! Cannot Delete");

            var enquiries = await _unitOfWork.Enquiries.GetAllAsync(x => x.PickUpSheetId == sheet.Id);

            foreach (var enquiry in enquiries)
            {
                enquiry.UndoPickUp();
            }

            _unitOfWork.PickUpSheets.Remove(sheet);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
