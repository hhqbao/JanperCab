using _1_Domain;
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

        Task<List<Enquiry>> GetDraftsAsync(ApplicationUser creator);

        Task<ItemList<Enquiry>> GetOrdersAsync(int? searchCustomerId, ApplicationUser currentUser, ProcessTypeEnum? status,
            string search, string sortBy, string direction, int page, int take);
    }
}