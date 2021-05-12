using _1_Domain;
using _3_Application.Dtos.OnHoldComponent;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class OnHoldComponentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OnHoldComponentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Operator")]
        [HttpGet("get-all/{processId}")]
        public async Task<IActionResult> GetAll(int processId)
        {
            var process = await _unitOfWork.Processes.GetAsync(processId);

            if (process == null)
                return BadRequest("Process Not Found");

            var components = await _unitOfWork.OnHoldComponents.GetAllAsync(x => x.ProcessId == processId);

            return Ok(_mapper.Map<List<OnHoldComponent>, List<OnHoldComponentDto>>(components));
        }

        [Authorize(Roles = "Operator")]
        [HttpPost]
        public async Task<IActionResult> Add(OnHoldComponentDto model)
        {
            var component = _mapper.Map<OnHoldComponentDto, OnHoldComponent>(model);

            _unitOfWork.OnHoldComponents.Add(component);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<OnHoldComponent, OnHoldComponentDto>(component));
        }

        [Authorize(Roles = "Operator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OnHoldComponentDto model)
        {
            var component = await _unitOfWork.OnHoldComponents.GetAsync(id);

            if (component == null)
                return BadRequest("Component Not Found");

            _mapper.Map(model, component);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<OnHoldComponent, OnHoldComponentDto>(component));
        }

        [Authorize(Roles = "Operator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var component = await _unitOfWork.OnHoldComponents.GetAsync(id);

            if (component == null)
                return BadRequest("Component Not Found");

            _unitOfWork.OnHoldComponents.Remove(component);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
