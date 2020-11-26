using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class MiscItemRepo : BaseRepository<MiscItem>, IMiscItemRepo
    {
        public MiscItemRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<MiscItem>> GetAllActiveAsync()
        {
            return await _dbSet.Where(x => !x.IsDisabled).ToListAsync();
        }
    }
}