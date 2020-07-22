using _1_Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformOrderRepo : IBaseRepository<DuraformForm>
    {
        Task<List<DuraformDraft>> GetDraftsAsync();

        Task<DuraformDraft> GetDraftAsync(Guid draftId);

        Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft);

        Task<int> CountDraftAsync(string userId);
    }
}