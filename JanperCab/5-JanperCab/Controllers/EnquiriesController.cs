using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.Common;
using _3_Application.Dtos.Enquiry;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _config;

        public EnquiriesController(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;
        }

        [HttpGet("for-invoicing")]
        public async Task<IActionResult> GetEnquiriesForInvoicing()
        {
            var enquiries = await _unitOfWork.Enquiries.GetEnquiriesForInvoicingAsync();

            return Ok(_mapper.Map<List<Enquiry>, List<EnquiryForInvoicingDto>>(enquiries));
        }

        [HttpGet("duraform/{id}")]
        public async Task<IActionResult> GetDuraform(int id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, currentUser.Customer);

            if (enquiry is DuraformEnquiry duraformEnquiry)
                return Ok(_mapper.Map<DuraformEnquiry, DuraformEnquiryDto>(duraformEnquiry));

            return BadRequest("Enquiry Not Found");
        }

        [HttpGet("duraform/drafts")]
        public async Task<IActionResult> GetDuraformDrafts()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var duraformDrafts = await _unitOfWork.Enquiries.GetDuraformDraftsAsync(currentUser);

            return Ok(_mapper.Map<List<DuraformEnquiry>, List<DuraformEnquiryListDto>>(duraformDrafts));
        }

        [HttpGet("duraform/orders")]
        public async Task<IActionResult> GetDuraformOrders(int? cusId, DuraformProcessEnum? status, string search,
            string sortBy, string dir, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var itemListDto = new ItemList<DuraformEnquiryListDto>();
            ItemList<DuraformEnquiry> itemList;

            if (int.TryParse(search, out var enquiryId))
            {
                var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(enquiryId, cusId.HasValue ? await _unitOfWork.Customers.GetAsync(cusId) : currentUser.Customer);

                if (enquiry is DuraformEnquiry duraformEnquiry)
                {
                    itemListDto.Items.Add(_mapper.Map<DuraformEnquiry, DuraformEnquiryListDto>(duraformEnquiry));
                    itemListDto.TotalItemCount = 1;

                    return Ok(itemListDto);
                }
            }

            switch (currentUser.Customer.CustomerType)
            {
                case CustomerType.CabinetMaker:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrdersAsync(currentUser.CustomerId, null, status,
                        search, sortBy, dir, page, take);
                    break;
                case CustomerType.Distributor:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrdersAsync(cusId, currentUser.CustomerId, status,
                        search, sortBy, dir, page, take);
                    break;
                case CustomerType.Manufacturer:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrdersAsync(null, cusId, status,
                        search, sortBy, dir, page, take);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }


            itemListDto.Items = _mapper.Map<List<DuraformEnquiry>, List<DuraformEnquiryListDto>>(itemList.Items);
            itemListDto.TotalItemCount = itemList.TotalItemCount;

            return Ok(itemListDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EnquiryDto enquiryDto)
        {
            var creator = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (!(creator.Customer is Manufacturer) &&
                enquiryDto.DistributorId != creator.CustomerId &&
                enquiryDto.CabinetMakerId != creator.CustomerId)
            {
                return BadRequest("Enquiry Not Valid");
            }

            var enquiry = _mapper.Map<EnquiryDto, Enquiry>(enquiryDto);

            enquiry.CreatorId = creator.Id;

            _unitOfWork.Enquiries.Add(enquiry);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiry));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EnquiryDto enquiryDto)
        {
            var creator = await _userManager.FindByEmailAsync(User.Identity.Name);
            var enquiryInDb = await _unitOfWork.Enquiries.GetEnquiryAsync(id, creator.Customer);

            if (enquiryInDb == null) return BadRequest("Enquiry Not Found");

            if (enquiryInDb.EnquiryType == EnquiryTypeEnum.Order)
                return BadRequest("Enquiry has been converted to Order! Cannot be editted");

            _mapper.Map(enquiryDto, enquiryInDb);
            enquiryInDb.LastEditted = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Enquiry, EnquiryDto>(enquiryInDb));
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, currentUser.Customer);

            if (enquiry == null)
                return BadRequest("Enquiry Not Found");

            enquiry.Approve();
            await _unitOfWork.CompleteAsync();

            return Ok();

        }
    }
}
