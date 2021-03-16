using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.Common;
using _3_Application.Dtos.Enquiry;
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

        [HttpGet("duraform/{id}")]
        public async Task<IActionResult> GetDuraform(int id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var enquiry = await _unitOfWork.Enquiries.GetEnquiryAsync(id, currentUser.Customer);

            if (enquiry is DuraformEnquiry duraformEnquiry)
            {
                return Ok(_mapper.Map<DuraformEnquiry, DuraformEnquiryDto>(duraformEnquiry));
            }

            return BadRequest("Enquiry Not Found");
        }

        [HttpGet("duraform/drafts")]
        public async Task<IActionResult> GetDuraformDrafts()
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var duraformDrafts = await _unitOfWork.Enquiries.GetDuraformDraftListAsync(currentUser);

            return Ok(_mapper.Map<List<DuraformEnquiry>, List<DuraformEnquiryListDto>>(duraformDrafts));
        }

        [HttpGet("duraform/orders")]
        public async Task<IActionResult> GetCabinetMakerOrders(int? cusId, DuraformProcessEnum? status, string search,
            string sortBy, string dir, int page = 0, int take = 20)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            ItemList<DuraformEnquiry> itemList;

            switch (currentUser.Customer.CustomerType)
            {
                case CustomerType.CabinetMaker:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrderListAsync(currentUser.CustomerId, null, status,
                        search, sortBy, dir, page, take);
                    break;
                case CustomerType.Distributor:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrderListAsync(cusId, currentUser.CustomerId, status,
                        search, sortBy, dir, page, take);
                    break;
                case CustomerType.Manufacturer:
                    itemList = await _unitOfWork.Enquiries.GetDuraformOrderListAsync(null, cusId, status,
                        search, sortBy, dir, page, take);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            var itemListDto = new ItemList<DuraformEnquiryListDto>
            {
                Items = _mapper.Map<List<DuraformEnquiry>, List<DuraformEnquiryListDto>>(itemList.Items),
                TotalItemCount = itemList.TotalItemCount
            };

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

            if (!(enquiry is DuraformEnquiry duraformEnquiry))
                return BadRequest("Enquiry Not Found");

            _unitOfWork.Enquiries.Approve(duraformEnquiry);
            await _unitOfWork.CompleteAsync();

            return Ok();

        }
    }
}
