using _1_Domain;
using _3_Application.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformOrderRepo : IBaseRepository<DuraformForm>
    {
        Task AddAsync(DuraformForm duraformForm, Distributor distributor, ApplicationUser user);

        Task ApproveOrderAsync(DuraformOrder order);

        Task ExportToICBAsync(DuraformOrder order, string savePath);

        Task<List<DuraformDraft>> GetDraftsAsync();

        Task<DuraformDraft> GetDraftAsync(Guid draftId);

        Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft);

        Task<int> CountDraftAsync(string userId);

        Task<int> CountFinalizedQuoteAsync(int customerId);

        Task<DuraformQuote> GetQuoteAsync(Guid quoteId, int customerId);

        Task<DuraformOrder> GetOrderAsync(Guid orderId, Customer customer);

        Task<ItemList<DuraformOrder>> GetCabinetMakerOrdersAsync(int cabinetMakerId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc",
            int page = 0, int take = 20);

        Task<ItemList<DuraformOrder>> GetDistributorOrdersAsync(int distributorId, int cabinetMakerId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc",
            int page = 0, int take = 20);

        Task<ItemList<DuraformOrder>> GetManufacturerOrdersAsync(int distributorId, OrderStatus? status, string search, string sortBy = "orderNumber", string direction = "asc",
            int page = 0, int take = 20);
    }
}