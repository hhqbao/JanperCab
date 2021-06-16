using _1_Domain;
using _3_Application.Dtos.Enquiry;
using _3_Application.Dtos.Machine;
using _3_Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProcessesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("routing/{routerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessRouting(int routerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(routerId);

            if (!(machine is MachineRouter router))
                return BadRequest("Router Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");


            enquiry.ProcessRouting(router);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("pressing/{presserId}/{enquiryId}")]
        public async Task<IActionResult> ProcessPressing(int presserId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(presserId);

            if (!(machine is MachinePresser presser))
                return BadRequest("Presser Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.ProcessPressing(presser);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("cleaning/start/{cleanerId}/{enquiryId}")]
        public async Task<IActionResult> StartProcessCleaning(int cleanerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(cleanerId);

            if (!(machine is MachineCleaning cleaningMachine))
                return BadRequest("Cleaning Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.StartCleaning(cleaningMachine);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("cleaning/finish/{enquiryId}")]
        public async Task<IActionResult> FinishProcessCleaning(int enquiryId)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.FinishCleaning();
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("packing/start/{packerId}/{enquiryId}")]
        public async Task<IActionResult> StartProcessPacking(int packerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(packerId);

            if (!(machine is MachinePacking packingMachine))
                return BadRequest("Packing Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.StartPacking(packingMachine);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("packing/finish/{enquiryId}")]
        public async Task<IActionResult> FinishProcessPacking(int enquiryId)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.FinishPacking();
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("delivering/{sheetId}/{enquiryId}")]
        public async Task<IActionResult> ProcessDelivering(int sheetId, int enquiryId)
        {
            var sheet = await _unitOfWork.DeliverySheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Sheet Not Found");

            if (sheet.LockedDate.HasValue)
                return BadRequest("Sheet Is Locked! Cannot Be Changed");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            sheet.AddOrder(enquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new EnquiryForSheetDto(enquiry));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("undo-delivering/{enquiryId}")]
        public async Task<IActionResult> UndoProcessDelivering(int enquiryId)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            enquiry.UndoDelivering();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
