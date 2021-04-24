using _1_Domain;
using _3_Application.Dtos.Driver;
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
    public class DriversController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DriversController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Driver,Sale")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var drivers = await _unitOfWork.Drivers.GetAllAsync(x => !x.IsDisabled);

            return Ok(_mapper.Map<List<Driver>, List<DriverDto>>(drivers));
        }
    }
}
