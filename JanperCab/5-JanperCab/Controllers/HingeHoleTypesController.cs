using _1_Domain;
using _3_Application.Dtos.HingeHoleType;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HingeHoleTypesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HingeHoleTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var types = await _unitOfWork.HingeHoleTypes.GetAllActiveAsync();

            return Ok(_mapper.Map<List<HingeHoleType>, List<HingeHoleTypeDto>>(types));
        }
    }
}
