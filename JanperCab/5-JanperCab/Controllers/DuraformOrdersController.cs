using _1_Domain;
using _3_Application.Dtos.Common;
using _3_Application.Dtos.DuraformDraft;
using _3_Application.Dtos.DuraformOrder;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IConfiguration _config;

        public DuraformOrdersController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<ApplicationUser> userManager, IWebHostEnvironment hostEnvironment, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
            _config = config;
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

        [Authorize(Roles = "CabinetMaker")]
        [HttpGet("CabinetMakerOrders")]
        public async Task<IActionResult> GetCabinetMakerOrders(OrderStatus? status, string search,
            string sortBy, string direction, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var itemList = await _unitOfWork.DuraformOrders.GetCabinetMakerOrdersAsync(currentUser.CustomerId, status, search, sortBy, direction, page, take);

            var itemListDto = new ItemList<DuraformOrderForListDto>
            {
                Items = _mapper.Map<List<DuraformOrder>, List<DuraformOrderForListDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount
            };

            return Ok(itemListDto);
        }

        [Authorize(Roles = "Distributor")]
        [HttpGet("DistributorOrders")]
        public async Task<IActionResult> GetDistributorOrders(int cabinetMakerId, OrderStatus? status, string search,
            string sortBy, string direction, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var itemList = await _unitOfWork.DuraformOrders.GetDistributorOrdersAsync(currentUser.CustomerId,
                cabinetMakerId, status, search, sortBy, direction, page, take);

            var itemListDto = new ItemList<DuraformOrderForListDto>
            {
                Items = _mapper.Map<List<DuraformOrder>, List<DuraformOrderForListDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount
            };

            return Ok(itemListDto);
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpGet("ManufacturerOrders")]
        public async Task<IActionResult> GetManufacturerOrders(int distributorId, OrderStatus? status, string search,
            string sortBy, string direction, int page = 0, int take = 20)
        {
            var itemList = await _unitOfWork.DuraformOrders.GetManufacturerOrdersAsync(distributorId, status, search, sortBy, direction, page, take);

            var itemListDto = new ItemList<DuraformOrderForListDto>
            {
                Items = _mapper.Map<List<DuraformOrder>, List<DuraformOrderForListDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount
            };

            return Ok(itemListDto);
        }


        [Authorize(Roles = "Distributor")]
        [HttpPut("DistributorOrders/Approve/{id}")]
        public async Task<IActionResult> ApproveOrder(Guid id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var order = await _unitOfWork.DuraformOrders.GetOrderAsync(id, currentUser.Customer);

            if (order == null)
                return BadRequest("Order Not Found!");

            await _unitOfWork.DuraformOrders.ApproveOrderAsync(order);
            await _unitOfWork.CompleteAsync();

            return Ok(order.OrderStatus);
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPost("DistributorOrders/ExportIcb/{id}")]
        public async Task<IActionResult> ExportIcb(Guid id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var order = await _unitOfWork.DuraformOrders.GetOrderAsync(id, currentUser.Customer);

            if (order == null)
                return BadRequest("Order Not Found!");

            await _unitOfWork.DuraformOrders.ExportToICBAsync(order, _config.GetSection("AppSettings:IcbFileLocation").Value);

            return Ok();
        }

        [HttpPut("DraftToOrder/{draftId}")]
        public async Task<IActionResult> DraftToOrder(Guid draftId, DuraformDraftDto draftDto)
        {
            var draft = await _unitOfWork.DuraformOrders.GetDraftAsync(draftId);

            if (draft == null)
                return BadRequest("Draft Not Found!");

            var distributor = await _unitOfWork.Customers.GetDistributorAsync(draftDto.DistributorId);

            if (distributor == null)
                return BadRequest("Distributor Not Found!");

            var author = await _userManager.FindByIdAsync(draftDto.CreatedByUserId);

            if (author == null)
                return BadRequest("User Not Found!");

            _mapper.Map(draftDto, draft);
            var order = _mapper.Map<DuraformDraft, DuraformOrder>(draft);

            await _unitOfWork.DuraformOrders.AddAsync(order, distributor, author);
            _unitOfWork.DuraformOrders.Remove(draft);

            await _unitOfWork.CompleteAsync();

            var rootPath = _hostEnvironment.WebRootPath;
            var sourcePath = Path.Combine(rootPath, "Files/DuraformForm", draft.Id.ToString());
            var destPath = Path.Combine(rootPath, "Files/DuraformForm", order.Id.ToString());

            if (Directory.Exists(sourcePath))
            {
                Directory.Move(sourcePath, destPath);
            }

            return Ok(_mapper.Map<DuraformOrder, DuraformOrderDto>(order));
        }
    }
}

