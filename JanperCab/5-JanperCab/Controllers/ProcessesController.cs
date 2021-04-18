using _1_Domain;
using _3_Application.Dtos.Enquiry;
using _3_Application.Dtos.Machine;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public ProcessesController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPut("routing/{routerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessRouting(int routerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(routerId);

            if (!(machine is MachineRouter router))
                return BadRequest("Router Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");


            enquiry.ProcessRouting(router);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [HttpPut("pressing/{presserId}/{enquiryId}")]
        public async Task<IActionResult> ProcessPressing(int presserId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(presserId);

            if (!(machine is MachinePresser presser))
                return BadRequest("Presser Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.ProcessPressing(presser);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [HttpPut("cleaning/{cleanerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessCleaning(int cleanerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(cleanerId);

            if (!(machine is MachineCleaning cleaningMachine))
                return BadRequest("Cleaning Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.ProcessCleaning(cleaningMachine);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [HttpPut("packing/{packerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessPacking(int packerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(packerId);

            if (!(machine is MachinePacking packingMachine))
                return BadRequest("Packing Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.ProcessPacking(packingMachine);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [HttpPut("delivering/{sheetId}/{enquiryId}")]
        public async Task<IActionResult> ProcessDelivering(int sheetId, int enquiryId)
        {
            var sheet = await _unitOfWork.DeliveryRunSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Run Sheet Not Found");

            if (sheet.LockedDate.HasValue)
                return BadRequest("Run Sheet Is Locked! Cannot Be Changed");

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (enquiry.DeliveryRunSheetId.HasValue)
                return BadRequest($"Order is already in run sheet number {enquiry.DeliveryRunSheetId}");

            enquiry.ProcessDelivering(sheet);
            await _unitOfWork.CompleteAsync();

            return Ok(new EnquiryForRunSheetDto(enquiry));
        }

        [HttpPut("undo-delivering/{enquiryId}")]
        public async Task<IActionResult> UndoProcessDelivering(int enquiryId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.DeliveryRunSheetId.HasValue)
                return BadRequest("Order Not Being Delivered");

            if (enquiry.DeliveryRunSheet.LockedDate.HasValue)
                return BadRequest("Run Sheet Is Locked! Cannot Be Changed");

            enquiry.UndoDelivering();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
