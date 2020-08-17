using _1_Domain;
using _3_Application.Dtos.DuraformOrder;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformOrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public DuraformOrdersController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var order = await _unitOfWork.DuraformOrders.GetOrderAsync(id, currentUser.Customer);

            if (order == null)
                return BadRequest("Order Not Found!");

            return Ok(_mapper.Map<DuraformOrder, DuraformOrderDto>(order));
        }

        [HttpPost]
        public async Task<IActionResult> Create(DuraformOrderDto modelDto)
        {
            var cabinetMaker = await _unitOfWork.Customers.GetCabinetMakerAsync(modelDto.CabinetMakerId);

            if (cabinetMaker == null)
                return BadRequest("Cabinet Maker Id Invalid!");

            var distributor = await _unitOfWork.Customers.GetDistributorAsync(modelDto.DistributorId);

            if (distributor == null)
                return BadRequest("Distributor Id Invalid!");

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var order = _mapper.Map<DuraformOrderDto, DuraformOrder>(modelDto);

            await _unitOfWork.DuraformOrders.AddAsync(order, distributor, currentUser);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<DuraformOrder, DuraformOrderDto>(order));
        }
    }
}

