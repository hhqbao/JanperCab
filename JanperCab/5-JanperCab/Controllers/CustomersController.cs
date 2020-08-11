using _1_Domain;
using _3_Application.Dtos.Customer;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public CustomersController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (currentUser.Customer.CustomerType != CustomerType.Distributor)
                return BadRequest("Request Invalid! Only Distributors Allowed!");

            var cabinetMakers = await _unitOfWork.Customers.GetCabinetMakersAsync(currentUser.CustomerId);

            return Ok(_mapper.Map<List<CabinetMaker>, List<CabinetMakerDto>>(cabinetMakers));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CabinetMakerDto modelDto)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (currentUser.Customer.CustomerType != CustomerType.Distributor)
                return BadRequest("Request Invalid! Only Distributors Allowed!");

            if (currentUser.CustomerId != modelDto.DistributorId)
                return BadRequest("Distributor Not Match!");

            var cabinetMaker = _mapper.Map<CabinetMakerDto, CabinetMaker>(modelDto);

            _unitOfWork.Customers.Add(cabinetMaker);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<CabinetMaker, CabinetMakerDto>(cabinetMaker));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CabinetMakerDto modelDto)
        {
            var existCustomer = await _unitOfWork.Customers.GetCabinetMakerAsync(id);

            if (existCustomer == null) return NotFound("Customer Not Found");

            _mapper.Map(modelDto, existCustomer);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<CabinetMaker, CabinetMakerDto>(existCustomer));
        }
    }
}
