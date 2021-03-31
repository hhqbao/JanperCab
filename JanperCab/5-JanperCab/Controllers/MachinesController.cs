using _1_Domain;
using _3_Application.Dtos.Machine;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MachinesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("productions")]
        public async Task<IActionResult> Productions()
        {
            var machines = await _unitOfWork.Machines.GetAllAsync();

            return Ok(_mapper.Map<List<Machine>, List<MachineProductionListDto>>(machines));
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPut("process-routing/{routerId}/{enquiryId}")]
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

            if (!duraformEnquiry.DuraformProcesses.OfType<DuraformProcessRouting>().Any())
                return BadRequest("Order not for ROUTING");

            var currentProcess = _unitOfWork.Machines.ProcessRouting(router, duraformEnquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(currentProcess));
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPut("process-pressing/{presserId}/{enquiryId}")]
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

            if (!duraformEnquiry.DuraformProcesses.OfType<DuraformProcessPressing>().Any())
                return BadRequest("Order not for PRESSING");

            var currentProcess = _unitOfWork.Machines.ProcessPressing(presser, duraformEnquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(currentProcess));
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPut("process-cleaning/{cleanerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessCleaning(int cleanerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(cleanerId);

            if (!(machine is MachineCleaning cleaner))
                return BadRequest("Cleaning Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            if (!duraformEnquiry.DuraformProcesses.OfType<DuraformProcessCleaning>().Any())
                return BadRequest("Order not for CLEANING");

            var currentProcess = _unitOfWork.Machines.ProcessCleaning(cleaner, duraformEnquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(currentProcess));
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPut("process-packing/{packerId}/{enquiryId}")]
        public async Task<IActionResult> ProcessPacking(int packerId, int enquiryId)
        {
            var machine = await _unitOfWork.Machines.GetAsync(packerId);

            if (!(machine is MachinePacking packer))
                return BadRequest("Packing Machine Not Found");

            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Duraform Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue)
                return BadRequest("Order needs to be APPROVED");

            if (!duraformEnquiry.DuraformProcesses.OfType<DuraformProcessPacking>().Any())
                return BadRequest("Order not for PACKING");

            var currentProcess = _unitOfWork.Machines.ProcessPacking(packer, duraformEnquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(new MachineProdutionCurrentProcessDto(currentProcess));
        }
    }
}
