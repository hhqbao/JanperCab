using _1_Domain;
using _3_Application.Dtos.Truck;
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
    public class TrucksController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TrucksController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var trucks = await _unitOfWork.Trucks.GetAllAsync(x => !x.IsDisabled);

            return Ok(_mapper.Map<List<Truck>, List<TruckDto>>(trucks));
        }
    }
}
