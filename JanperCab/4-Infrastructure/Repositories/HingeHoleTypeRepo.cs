using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class HingeHoleTypeRepo : BaseRepository<HingeHoleType>, IHingeHoleTypeRepo
    {
        public HingeHoleTypeRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<HingeHoleType>> GetAllActiveAsync()
        {
            return await _dbSet.Where(x => !x.IsDisabled).ToListAsync();
        }
    }
}