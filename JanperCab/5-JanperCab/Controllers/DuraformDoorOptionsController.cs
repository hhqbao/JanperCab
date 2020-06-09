using _1_Domain;
using _3_Application.Dtos.DuraformDoorOption;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformDoorOptionsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformDoorOptionsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetAllActive")]
        public async Task<IActionResult> GetAllActive()
        {
            var options = await _unitOfWork.DuraformDoorOptions.GetAllActiveAsync();

            return Ok(_mapper.Map<List<DuraformDoorOption>, List<DuraformDoorOptionForList>>(options));
        }
    }
}
