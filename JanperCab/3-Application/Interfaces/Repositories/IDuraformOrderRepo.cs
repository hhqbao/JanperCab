using _1_Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformOrderRepo : IBaseRepository<DuraformForm>
    {
        Task AddAsync(DuraformForm duraformForm, Distributor distributor, ApplicationUser user);

        Task<List<DuraformDraft>> GetDraftsAsync();

        Task<DuraformDraft> GetDraftAsync(Guid draftId);

        Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft);

        Task<int> CountDraftAsync(string userId);

        Task<int> CountFinalizedQuoteAsync(int customerId);

        Task<DuraformQuote> GetQuoteAsync(Guid quoteId, int customerId);
    }
}