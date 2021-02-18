using _1_Domain;
using _3_Application.Dtos.HingeHoleOption;
using _3_Application.Dtos.HingeHoleType;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HingeHolesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HingeHolesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetTypes()
        {
            var types = await _unitOfWork.HingeHoleTypes.GetAllActiveAsync();

            return Ok(_mapper.Map<List<HingeHoleType>, List<HingeHoleTypeDto>>(types));
        }

        [HttpGet("styles")]
        public async Task<IActionResult> GetStyles()
        {
            var styles = await _unitOfWork.HingeHoleStyles.GetAllAsync();

            return Ok(_mapper.Map<List<HingeHoleStyle>, List<HingeHoleStyleDto>>(styles));
        }
    }
}
