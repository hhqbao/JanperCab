using _1_Domain;
using _3_Application.Dtos.DuraformDraft;
using _3_Application.Dtos.DuraformQuote;
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
    public class DuraformQuotesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformQuotesController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("GetSmallList")]
        public async Task<IActionResult> GetSmallList()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            throw new NotImplementedException();
            //var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            //var quote = await _unitOfWork.DuraformOrders.GetQuoteAsync(id, currentUser.CustomerId);

            //if (quote == null)
            //    return BadRequest("Quote Not Found!");

            //return Ok(_mapper.Map<DuraformQuote, DuraformQuoteDto>(quote));
        }

        [HttpGet("Count")]
        public async Task<IActionResult> Count()
        {
            throw new Exception();
            //var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            //var count = await _unitOfWork.DuraformOrders.CountFinalizedQuoteAsync(currentUser.CustomerId);

            //return Ok(count);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DuraformQuoteDto quoteDto)
        {
            throw new NotImplementedException();
            //var customer = await _unitOfWork.Customers.GetAsync(quoteDto.CustomerId);

            //if (customer == null)
            //    return BadRequest("Customer Not Found!");

            //var quote = new DuraformQuote();
            //_mapper.Map(quoteDto, quote);

            //var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            //await _unitOfWork.DuraformOrders.AddAsync(quote, customer, currentUser);
            //await _unitOfWork.CompleteAsync();

            //return Ok(_mapper.Map<DuraformQuote, DuraformQuoteDto>(quote));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, DuraformDraftDto draftDto)
        {
            throw new NotImplementedException();
        }
    }
}
