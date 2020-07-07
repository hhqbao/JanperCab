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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformOrdersController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("Drafts")]
        public async Task<IActionResult> CreateDraft(DuraformDraftDto draftDto)
        {
            var draft = new DuraformDraft();
            _mapper.Map(draftDto, draft);

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            draft.CreatedByUserId = currentUser.Id;

            _unitOfWork.DuraformOrders.Add(draft);
            await _unitOfWork.CompleteAsync();

            return Ok(draft.Id);
        }

        [HttpPut("Drafts/{id}")]
        public async Task<IActionResult> UpdateDraft(Guid id, DuraformDraftDto draftDto)
        {
            var draftInDb = await _unitOfWork.DuraformOrders.GetDraftAsync(id);

            if (draftInDb == null)
                return BadRequest("Draft Not Found!");

            var newDraft = _mapper.Map<DuraformDraftDto, DuraformDraft>(draftDto);
            await _unitOfWork.DuraformOrders.UpdateDraftAsync(draftInDb, newDraft);


            return Ok();
        }
    }
}
