using _1_Domain;
using _3_Application.Dtos.DeliveryDocket;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryDocketsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DeliveryDocketsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{enquiryId}")]
        public async Task<IActionResult> Get(int enquiryId)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            return Ok(_mapper.Map<Enquiry, DeliveryDocketDto>(enquiry));
        }
    }
}
