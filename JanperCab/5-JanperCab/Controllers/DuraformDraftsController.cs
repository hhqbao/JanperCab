using _1_Domain;
using _3_Application.Dtos.DuraformOrder;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformDraftsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformDraftsController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var drafts = await _unitOfWork.DuraformOrders.GetDraftsAsync();

            return Ok(_mapper.Map<List<DuraformDraft>, List<DuraformDraftDto>>(drafts));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var draftInDb = await _unitOfWork.DuraformOrders.GetDraftAsync(id);

            if (draftInDb == null)
                return BadRequest("Draft Not Found!");

            return Ok(_mapper.Map<DuraformDraft, DuraformDraftDto>(draftInDb));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> Count()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var count = await _unitOfWork.DuraformOrders.CountDraftAsync(user.Id);

            return Ok(count);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DuraformDraftDto draftDto)
        {
            var customer = await _unitOfWork.Customers.GetAsync(draftDto.CustomerId);

            if (customer == null)
                return BadRequest("Customer Not Found!");

            var draft = new DuraformDraft();
            _mapper.Map(draftDto, draft);

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            draft.CreatedByUserId = currentUser.Id;
            draft.CustomerId = customer.Id;

            _unitOfWork.DuraformOrders.Add(draft);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<DuraformDraft, DuraformDraftDto>(draft));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, DuraformDraftDto draftDto)
        {
            var draftInDb = await _unitOfWork.DuraformOrders.GetDraftAsync(id);

            if (draftInDb == null)
                return BadRequest("Draft Not Found!");

            draftInDb = _mapper.Map(draftDto, draftInDb);
            draftInDb.LastUpdated = DateTime.Now;

            await _unitOfWork.CompleteAsync();


            return Ok(_mapper.Map<DuraformDraft, DuraformDraftDto>(draftInDb));
        }
    }
}
