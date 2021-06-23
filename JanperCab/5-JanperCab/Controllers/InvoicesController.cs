using _1_Domain;
using _3_Application.Dtos.Invoice;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public InvoicesController(IUnitOfWork _unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this._unitOfWork = _unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> Get(int invoiceId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var invoice = await _unitOfWork.Invoices.GetAsync(invoiceId, currentUser.Customer);

            if (invoice == null)
                return BadRequest("Invoice Not Found");

            return Ok(_mapper.Map<Invoice, InvoiceDto>(invoice));
        }

        [Authorize(Roles = "Sale")]
        [HttpPost("{enquiryId}")]
        public async Task<IActionResult> Create(int enquiryId)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            if (enquiry.Invoice != null)
                return BadRequest("Order already been INVOICED");

            var invoice = await _unitOfWork.Invoices.GenerateAsync(enquiry);

            _unitOfWork.Invoices.Add(invoice);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Invoice, InvoiceDto>(invoice));
        }
    }
}
