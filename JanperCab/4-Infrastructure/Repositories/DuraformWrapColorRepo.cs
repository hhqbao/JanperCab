using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformWrapColorRepo : BaseRepository<DuraformWrapColor>, IDuraformWrapColorRepo
    {
        public DuraformWrapColorRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformWrapColor>> GetForDoorAsync(int doorId)
        {
            var colors = await _dbSet
                .Include(x => x.DuraformWrapType)
                .Where(x => x.DuraformWrapType.NotAvailableDoorWrapTypes.All(y => y.DuraformDoorId != doorId))
                .ToListAsync();

            return colors;
        }
    }
}