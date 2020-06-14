using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformWrappingOptionRepo : BaseRepository<DuraformWrappingOption>, IDuraformWrappingOptionRepo
    {
        public DuraformWrappingOptionRepo(DbContext dbContext) : base(dbContext)
        {

        }


        public async Task<List<DuraformWrappingOption>> GetAllActiveAsync()
        {
            return await _dbSet.Where(x => !x.IsDisabled).ToListAsync();
        }
    }
}