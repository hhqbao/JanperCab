using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformOrderRepo : BaseRepository<DuraformForm>, IDuraformOrderRepo
    {
        public DuraformOrderRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformDraft>> GetDraftsAsync()
        {
            return await _dbSet.OfType<DuraformDraft>().ToListAsync();
        }

        public async Task<DuraformDraft> GetDraftAsync(Guid draftId)
        {
            return await _dbSet.OfType<DuraformDraft>()
                .Include(x => x.DuraformComponents)
                .FirstOrDefaultAsync(x => x.Id.Equals(draftId));
        }

        public async Task UpdateDraftAsync(DuraformDraft draftInDb, DuraformDraft newDraft)
        {
            newDraft.Id = draftInDb.Id;
            newDraft.CreatedDate = draftInDb.CreatedDate;
            newDraft.LastUpdated = DateTime.Now;
            newDraft.CreatedByUserId = draftInDb.CreatedByUserId;

            _dbSet.Remove(draftInDb);
            await _dbContext.SaveChangesAsync();

            _dbSet.Add(newDraft);
            await _dbContext.SaveChangesAsync();
        }
    }
}