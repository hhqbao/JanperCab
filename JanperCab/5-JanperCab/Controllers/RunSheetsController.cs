using _1_Domain;
using _3_Application.Dtos.DeliveryRunSheet;
using _3_Application.Dtos.Driver;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class RunSheetsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RunSheetsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sheets = await _unitOfWork.DeliveryRunSheets.GetAllAsync(x => !x.DeliveredDate.HasValue);

            return Ok(_mapper.Map<List<DeliveryRunSheet>, List<DeliveryRunSheetForListDto>>(sheets));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var sheet = await _unitOfWork.DeliveryRunSheets.GetAsync(id);

            return Ok(_mapper.Map<DeliveryRunSheet, DeliveryRunSheetForListDto>(sheet));
        }

        [HttpPost("{driverId}")]
        public async Task<IActionResult> Create(int driverId)
        {
            var driver = await _unitOfWork.Drivers.GetAsync(driverId);

            if (driver == null)
                return BadRequest("Driver Not Found");

            var newSheet = new DeliveryRunSheet { DriverId = driver.Id };
            _unitOfWork.DeliveryRunSheets.Add(newSheet);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<DeliveryRunSheet, DeliveryRunSheetForListDto>(newSheet));
        }

        [HttpPut("change-driver/{sheetId}/{driverId}")]
        public async Task<IActionResult> ChangeDriver(int sheetId, int driverId)
        {
            var sheet = await _unitOfWork.DeliveryRunSheets.GetAsync(sheetId);

            if (sheet == null) return BadRequest("Run Sheet Not Found");

            if (!sheet.IsEditable) return BadRequest("Run Sheet Is Locked! Cannot Be Changed");

            var driver = await _unitOfWork.Drivers.GetAsync(driverId);

            if (driver == null) return BadRequest("Driver Not Found");

            sheet.DriverId = driver.Id;
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Driver, DriverDto>(driver));
        }

        [HttpPut("lock/{sheetId}")]
        public async Task<IActionResult> Lock(int sheetId)
        {
            var runSheet = await _unitOfWork.DeliveryRunSheets.GetAsync(sheetId);

            if (runSheet == null) return BadRequest("Run Sheet Not Found");

            if (runSheet.Enquiries.Count == 0)
                return BadRequest("At least 1 order required");

            if (!runSheet.IsEditable) return BadRequest("Run Sheet Not Valid For Locking");

            runSheet.LockedDate = DateTime.Now;
            await _unitOfWork.CompleteAsync();

            return Ok(runSheet.LockedDate.Value);
        }

        [HttpPut("confirm-delivery/{sheetId}")]
        public async Task<IActionResult> ConfirmDelivery(int sheetId)
        {
            var sheet = await _unitOfWork.DeliveryRunSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Run Sheet Not Found");

            if (!sheet.LockedDate.HasValue)
                return BadRequest("Run Sheet need to be LOCKED first");

            if (sheet.DeliveredDate.HasValue)
                return BadRequest($"Run Sheet was completed on {sheet.DeliveredDate.Value:dd/MM/yyyy hh:mm}");

            var deliveredDate = sheet.ConfirmDelivery();
            await _unitOfWork.CompleteAsync();

            return Ok(deliveredDate);
        }
    }
}
