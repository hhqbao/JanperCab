﻿using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IEnquiryRepo : IBaseRepository<Enquiry>
    {
        Task<Enquiry> GetEnquiryAsync(int id, Customer customer);

        Task<List<Enquiry>> GetEnquiriesForInvoicingAsync();

        Task<List<DuraformEnquiry>> GetDuraformDraftsAsync(ApplicationUser creator);

        Task<ItemList<DuraformEnquiry>> GetDuraformOrdersAsync(int? cabinetMakerId, int? distributorId, DuraformProcessEnum? status,
            string search, string sortBy, string direction, int page, int take);
    }
}