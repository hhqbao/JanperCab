using _1_Domain;
using _3_Application.Dtos.Common;
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

        [HttpGet("CabinetMakers")]
        public async Task<IActionResult> GetCabinetMakers(string search, string sortBy, string direction, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (currentUser.Customer.CustomerType != CustomerType.Distributor)
                return BadRequest("Request Invalid! Only Distributors Allowed!");

            var itemList = await _unitOfWork.Customers.GetCabinetMakersAsync(currentUser.CustomerId, search, sortBy, direction, page, take);

            var itemListDto = new ItemList<CabinetMakerDto>
            {
                Items = _mapper.Map<List<CabinetMaker>, List<CabinetMakerDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount,
            };

            return Ok(itemListDto);
        }

        [HttpGet("Distributors")]
        public async Task<IActionResult> GetDistributors()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (currentUser.Customer.CustomerType != CustomerType.Manufacturer)
                return BadRequest("Request Invalid! Only Manufacturers Allowed");

            var distributors = await _unitOfWork.Customers.GetDistributorsAsync();

            return Ok(_mapper.Map<List<Distributor>, List<DistributorDto>>(distributors));
        }

        [HttpGet("CabinetMakers/{id}")]
        public async Task<IActionResult> CabinetMaker(int id)
        {
            var cabinetMaker = await _unitOfWork.Customers.GetCabinetMakerAsync(id);

            if (cabinetMaker == null)
                return BadRequest("Customer Not Found");

            return Ok(_mapper.Map<CabinetMaker, CabinetMakerDto>(cabinetMaker));
        }


        [HttpGet("Distributors/{id}")]
        public async Task<IActionResult> Distributor(int id)
        {
            var distributor = await _unitOfWork.Customers.GetDistributorAsync(id);

            if (distributor == null)
                return BadRequest("Distributor Not Found");

            return Ok(_mapper.Map<Distributor, DistributorDto>(distributor));
        }

        [HttpPost("CabinetMakers")]
        public async Task<IActionResult> CreateCabinetMaker(CabinetMakerDto modelDto)
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

        [HttpPut("CabinetMakers/{id}")]
        public async Task<IActionResult> UpdateCabinetMaker(int id, CabinetMakerDto modelDto)
        {
            var existCustomer = await _unitOfWork.Customers.GetCabinetMakerAsync(id);

            if (existCustomer == null) return NotFound("Customer Not Found");

            _mapper.Map(modelDto, existCustomer);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<CabinetMaker, CabinetMakerDto>(existCustomer));
        }
    }
}
