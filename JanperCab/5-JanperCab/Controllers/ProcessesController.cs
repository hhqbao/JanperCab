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

        [Authorize(Roles = "Operator")]
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

        [Authorize(Roles = "Operator")]
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

        [Authorize(Roles = "Operator")]
        [HttpPut("cleaning/start/{cleanerId}/{enquiryId}")]
        public async Task<IActionResult> StartProcessCleaning(int cleanerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(cleanerId);

            if (!(machine is MachineCleaning cleaningMachine))
                return BadRequest("Cleaning Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
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

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
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

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
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

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            enquiry.FinishPacking();
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(enquiry.CurrentProcess));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("delivering/{sheetId}/{enquiryId}")]
        public async Task<IActionResult> ProcessDelivering(int sheetId, int enquiryId)
        {
            var sheet = await _unitOfWork.DeliveryRunSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Run Sheet Not Found");

            if (!sheet.IsEditable)
                return BadRequest("Run Sheet Is Locked! Cannot Be Changed");

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (enquiry.DeliveryRunSheetId.HasValue)
                return BadRequest($"Order is already in delivery sheet number {enquiry.DeliveryRunSheetId}");

            if (enquiry.PickUpSheetId.HasValue)
                return BadRequest($"Order is in pick up sheet number {enquiry.PickUpSheetId}");

            enquiry.ProcessDelivering(sheet);
            await _unitOfWork.CompleteAsync();

            return Ok(new EnquiryForRunSheetDto(enquiry));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("pickup/{sheetId}/{enquiryId}")]
        public async Task<IActionResult> ProcessPickUp(int sheetId, int enquiryId)
        {
            var sheet = await _unitOfWork.PickUpSheets.GetAsync(sheetId);

            if (sheet == null)
                return BadRequest("Sheet Not Found");

            if (sheet.IsCompleted)
                return BadRequest("Sheet Is Completed! Cannot Be Changed");

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (enquiry.DeliveryRunSheetId.HasValue)
                return BadRequest($"Order is in delivery sheet number {enquiry.DeliveryRunSheetId}");

            if (enquiry.PickUpSheetId.HasValue)
                return BadRequest($"Order is in pick up sheet number {enquiry.PickUpSheetId}");

            var pickUpCustomer = await _unitOfWork.Customers.GetAsync(sheet.CustomerId);

            if (enquiry.CustomerId != pickUpCustomer.Id && enquiry.ManagerId != pickUpCustomer.Id)
                return BadRequest($"This order belongs to {enquiry.Customer.Name}! Cannot process pick up");

            enquiry.ProcessPickUp(sheet);
            await _unitOfWork.CompleteAsync();

            return Ok(new EnquiryForPickUpSheetDto(enquiry));
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("undo-delivering/{enquiryId}")]
        public async Task<IActionResult> UndoProcessDelivering(int enquiryId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.DeliveryRunSheetId.HasValue)
                return BadRequest("Order Not Being Delivered");

            if (!enquiry.DeliveryRunSheet.IsEditable)
                return BadRequest("Run Sheet Is Locked! Cannot Be Changed");

            enquiry.UndoDelivering();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [Authorize(Roles = "Driver")]
        [HttpPut("undo-pickup/{enquiryId}")]
        public async Task<IActionResult> UndoProcessPickUp(int enquiryId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (!enquiry.PickUpSheetId.HasValue)
                return BadRequest("Order Not Being Picked Up");

            if (enquiry.PickUpSheet.IsCompleted)
                return BadRequest("Order Has Been Picked Up! Cannot Be Changed");

            enquiry.UndoPickUp();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
