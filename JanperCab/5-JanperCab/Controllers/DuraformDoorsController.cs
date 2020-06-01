using _1_Domain;
using _3_Application.Dtos.DuraformDoor;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformDoorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformDoorsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetForOrderMenu")]
        public async Task<IActionResult> GetForOrderMenu()
        {
            var duraformDoors = await _unitOfWork.DuraformDoors.GetAllAsync();

            return Ok(_mapper.Map<List<DuraformDoor>, List<DuraformDoorForOrderMenu>>(duraformDoors));
        }
    }
}
