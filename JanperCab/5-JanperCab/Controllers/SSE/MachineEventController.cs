using _1_Domain;
using _3_Application.Dtos.Machine;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers.SSE
{
    [Authorize(Roles = "Manufacturer")]
    [Route("sse/[controller]")]
    [ApiController]
    public class MachineEventController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MachineEventController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("productions")]
        public async Task GetMachinesInProduction()
        {
            var machines = await _unitOfWork.Machines.GetAllAsync();

            var model = _mapper.Map<List<Machine>, List<MachineProductionListDto>>(machines);

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