using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformWrapTypeRepo : BaseRepository<DuraformWrapType>, IDuraformWrapTypeRepo
    {
        public DuraformWrapTypeRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformWrapType>> GetForDoorAsync(int doorId)
        {
            var types = await _dbSet
                .Where(x => x.NotAvailableDoorWrapTypes.All(y => y.DuraformDoorId != doorId))
                .ToListAsync();

            return types;
        }
    }
}