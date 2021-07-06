using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.CashOrderPayment;
using _3_Application.Dtos.Common;
using _3_Application.Dtos.Enquiry;
using _3_Application.Dtos.PackingLabel;
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
    public class EnquiriesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EnquiriesController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpGet("packing-label/{enquiryId}")]
        public async Task<IActionResult> GetEnquiryPackingLabel(int enquiryId)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(enquiryId);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            return Ok(new PackingLabelDto(enquiry));
        }

        [Authorize(Roles = "Sale")]
        [HttpGet("for-invoicing")]
        public async Task<IActionResult> GetEnquiriesForInvoicing()
        {
            var enquiries = await _unitOfWork.Enquiries.GetEnquiriesForInvoicingAsync();

            return Ok(_mapper.Map<List<Enquiry>, List<EnquiryForInvoicingDto>>(enquiries));
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Manufacturer")]
        [HttpGet("duraform/{id}")]
        public async Task<IActionResult> GetDuraform(int id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, currentUser.Customer);

            if (enquiry is DuraformEnquiry duraformEnquiry)
                return Ok(_mapper.Map<DuraformEnquiry, DuraformEnquiryDto>(duraformEnquiry));

            return BadRequest("Enquiry Not Found");
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpGet("duraform/drafts")]
        public async Task<IActionResult> GetDuraformDrafts()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var duraformDrafts = await _unitOfWork.Enquiries.GetDuraformDraftsAsync(currentUser);

            return Ok(_mapper.Map<List<DuraformEnquiry>, List<EnquiryListDto>>(duraformDrafts));
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpGet("duraform/orders")]
        public async Task<IActionResult> GetDuraformOrders(int? cusId, ProcessTypeEnum? status, string search,
            string sortBy, string dir, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var itemListDto = new ItemList<EnquiryListDto>();

            if (int.TryParse(search, out var enquiryId))
            {
                var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, cusId.HasValue ? await _unitOfWork.Customers.GetAsync(cusId) : currentUser.Customer);

                if (enquiry is DuraformEnquiry duraformEnquiry)
                {
                    itemListDto.Items.Add(_mapper.Map<DuraformEnquiry, EnquiryListDto>(duraformEnquiry));
                    itemListDto.TotalItemCount = 1;

                    return Ok(itemListDto);
                }
            }

            var itemList = await _unitOfWork.Enquiries.GetDuraformOrdersAsync(cusId, currentUser, status, search, sortBy,
                dir, page, take);

            itemListDto.Items = _mapper.Map<List<DuraformEnquiry>, List<EnquiryListDto>>(itemList.Items);
            itemListDto.TotalItemCount = itemList.TotalItemCount;

            return Ok(itemListDto);
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpPost]
        public async Task<IActionResult> Create(EnquiryDto enquiryDto)
        {
            var creator = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = _mapper.Map<EnquiryDto, Enquiry>(enquiryDto);

            enquiry.CreatorId = creator.Id;

            _unitOfWork.Enquiries.Add(enquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiry));
        }

        [Authorize(Roles = "CabinetMaker,Distributor,Sale")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EnquiryDto enquiryDto)
        {
            var creator = await _userManager.FindByEmailAsync(User.Identity.Name);
            var enquiryInDb = await _unitOfWork.Enquiries.GetEnquiryAsync(id, creator.Customer);

            if (enquiryInDb == null) return BadRequest("Order Not Found");

            if (enquiryInDb.EnquiryType == EnquiryTypeEnum.Order)
                return BadRequest("Enquiry has been converted to Order! Cannot be editted");

            _mapper.Map(enquiryDto, enquiryInDb);
            enquiryInDb.LastEditted = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiryInDb));
        }

        [Authorize(Roles = "Sale")]
        [HttpPut("update-price-only/{id}")]
        public async Task<IActionResult> UpdatePriceOnly(int id, EnquiryPriceDto enquiryPriceDto)
        {
            var enquiryInDb = await _unitOfWork.Enquiries.GetAsync(id);

            if (enquiryInDb == null) return BadRequest("Order Not Found");

            if (enquiryInDb.HasBeenInvoiced)
                return BadRequest("Order has been invoiced! Cannot edit.");

            _mapper.Map(enquiryPriceDto, enquiryInDb);
            enquiryInDb.LastEditted = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiryInDb));
        }

        [Authorize(Roles = "Sale")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(id);

            if (enquiry == null)
                return BadRequest("Order Not Found");

            enquiry.Approve();
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [Authorize(Roles = "Sale")]
        [HttpPut("decline/{id}")]
        public async Task<IActionResult> Decline(int id)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(id);

            if (enquiry == null) return BadRequest("Order Not Found");

            if (!enquiry.IsDeclineable) return BadRequest("Order is in production! Cannot be declined");

            enquiry.Decline();
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiry));
        }

        [Authorize(Roles = "Sale")]
        [HttpPost("make-cash-payment")]
        public async Task<IActionResult> MakeCashPayment(MakeCashPaymentModelDto model)
        {
            var enquiry = await _unitOfWork.Enquiries.GetAsync(model.EnquiryId);

            if (enquiry == null) return BadRequest("Order Not Found");

            if (enquiry.EnquiryPaymentType == EnquiryPaymentType.Account)
                return BadRequest("Not CBD Order! Cannot make payment");

            if (enquiry.HasBeenFullyPaid)
                return BadRequest("Order has already fully paid! No longer accept more payment");

            var payment = enquiry.ReceiveCashPayment(model.Amount);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<CashOrderPayment, CashOrderPaymentDto>(payment));
        }
    }
}
