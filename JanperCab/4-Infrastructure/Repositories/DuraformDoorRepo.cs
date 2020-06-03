using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformDoorRepo : BaseRepository<DuraformDoor>, IDuraformDoorRepo
    {
        public DuraformDoorRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformDoor>> GetForOrderMenuAsync()
        {
            return await _dbSet
                .Include(x => x.FixedEdgeProfile)
                .Include(x => x.DefaultEdgeProfile)
                .ToListAsync();
        }
    }
}