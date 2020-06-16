using _1_Domain;
using _3_Application.Dtos.DuraformDesign;
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
    public class DuraformDesignsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformDesignsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetForOrderMenu")]
        public async Task<IActionResult> GetForOrderMenu()
        {
            var duraformDoors = await _unitOfWork.DuraformDesigns.GetForOrderMenuAsync();

            return Ok(_mapper.Map<List<DuraformDesign>, List<DuraformDesignForOrderMenu>>(duraformDoors));
        }
    }
}
