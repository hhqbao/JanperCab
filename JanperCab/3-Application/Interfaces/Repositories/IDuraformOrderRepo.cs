using _1_Domain;
using System;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformOrderRepo : IBaseRepository<DuraformForm>
    {
        Task<DuraformDraft> GetDraftAsync(Guid draftId);

        Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft);
    }
}