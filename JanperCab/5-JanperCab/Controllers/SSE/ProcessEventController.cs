using _1_Domain;
using _3_Application.Dtos.Process;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers.SSE
{
    [Authorize]
    [Route("sse/[controller]")]
    [ApiController]
    public class ProcessEventController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProcessEventController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("duraform/{enquiryId}")]
        public async Task GetDuraformEnquiryProcesses(int enquiryId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (!(enquiry is DuraformEnquiry duraformEnquiry)) throw new Exception("Order Not Found");

            if (!duraformEnquiry.ApprovedDate.HasValue) throw new Exception("Order needs to be APPROVED");

            var model = _mapper.Map<List<DuraformProcess>, List<DuraformProcessDto>>(duraformEnquiry.DuraformProcesses
                .ToList());

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
