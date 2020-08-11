using _1_Domain;
using _3_Application.Dtos.DuraformDraft;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("GetSmallList")]
        public async Task<IActionResult> GetSmallList()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var drafts = currentUser.DuraformForms.OfType<DuraformDraft>().Take(10).ToList();

            var draftDtos = _mapper.Map<List<DuraformDraft>, List<DuraformDraftForSmallList>>(drafts);

            return Ok(draftDtos.OrderByDescending(x => x.CreatedDate).ToList());
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
            var distributor = await _unitOfWork.Customers.GetDistributorAsync(draftDto.DistributorId);

            if (distributor == null)
                return BadRequest("Distributor Not Found!");

            var cabinetMaker = await _unitOfWork.Customers.GetCabinetMakerAsync(draftDto.CabinetMakerId);

            if (cabinetMaker == null)
                return BadRequest("Cabinet Maker Not Found!");

            var draft = new DuraformDraft();
            _mapper.Map(draftDto, draft);

            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            await _unitOfWork.DuraformOrders.AddAsync(draft, distributor, currentUser);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<DuraformDraft, DuraformDraftDto>(draft));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, DuraformDraftDto draftDto)
        {
            var draftInDb = await _unitOfWork.DuraformOrders.GetDraftAsync(id);

            if (draftInDb == null)
                return BadRequest("Draft Not Found!");

            var distributor = await _unitOfWork.Customers.GetDistributorAsync(draftDto.DistributorId);

            if (distributor == null)
                return BadRequest("Distributor Not Found!");

            var cabinetMaker = await _unitOfWork.Customers.GetCabinetMakerAsync(draftDto.CabinetMakerId);

            if (cabinetMaker == null)
                return BadRequest("Cabinet Maker Not Found!");

            draftInDb = _mapper.Map(draftDto, draftInDb);
            draftInDb.LastUpdated = DateTime.Now;

            await _unitOfWork.CompleteAsync();


            return Ok(_mapper.Map<DuraformDraft, DuraformDraftDto>(draftInDb));
        }
    }
}
