using _1_Domain;
using _3_Application.Dtos.DuraformOptionType;
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
    public class DuraformOptionTypesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformOptionTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var types = await _unitOfWork.DuraformOptionTypes.GetAllAsync();

            return Ok(_mapper.Map<List<DuraformOptionType>, List<DuraformOptionTypeDto>>(types));
        }
    }
}
