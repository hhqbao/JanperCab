using _1_Domain;
using _3_Application.Dtos.Enquiry;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers.SSE
{
    [Authorize]
    [Route("sse/[controller]")]
    [ApiController]
    public class EnquiryEventController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EnquiryEventController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("for-invoicing")]
        public async Task GetEnquiriesForInvoicing()
        {
            var enquiries = await _unitOfWork.Enquiries.GetEnquiriesForInvoicingAsync();

            var model = _mapper.Map<List<Enquiry>, List<EnquiryForInvoicingDto>>(enquiries);

            var jsonString = JsonConvert.SerializeObject(model,
                new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore, ContractResolver = new CamelCasePropertyNamesContractResolver() });

            var response = Response;
            response.Headers.Add("Content-Type", "text/event-stream");

            await response
                .WriteAsync($"data: {jsonString}\r\r");

            await response.Body.FlushAsync();

            await Task.Delay(10 * 1000);
        }
    }
}
