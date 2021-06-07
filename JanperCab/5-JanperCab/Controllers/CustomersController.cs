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

        [Authorize(Roles = "Distributor,Manufacturer")]
        [HttpGet]
        public async Task<IActionResult> Get(string search, string sortBy, string direction, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var itemList = await _unitOfWork.Customers.GetCustomersAsync(currentUser, search, sortBy, direction, page, take);

            var itemListDto = new ItemList<CustomerDto>
            {
                Items = _mapper.Map<List<Customer>, List<CustomerDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount,
            };

            return Ok(itemListDto);
        }



        [Authorize(Roles = "CabinetMaker,Distributor,Manufacturer")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customer = await _unitOfWork.Customers.GetAsync(id);

            if (customer == null)
                return BadRequest("Customer Not Found");

            return Ok(_mapper.Map<Customer, CustomerDto>(customer));
        }



        [Authorize(Roles = "Distributor,Sale")]
        [HttpPost]
        public async Task<IActionResult> Create(CustomerDto modelDto)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var customer = _mapper.Map<CustomerDto, Customer>(modelDto);

            if (User.IsInRole("Distributor"))
                customer.ManagerId = currentUser.CustomerId;


            _unitOfWork.Customers.Add(customer);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Customer, CustomerDto>(customer));
        }

        [Authorize(Roles = "Distributor, Sale")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CustomerDto modelDto)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var existCustomer = await _unitOfWork.Customers.GetAsync(id, currentUser);

            if (existCustomer == null) return NotFound("Customer Not Found");

            _mapper.Map(modelDto, existCustomer);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Customer, CustomerDto>(existCustomer));
        }
    }
}
