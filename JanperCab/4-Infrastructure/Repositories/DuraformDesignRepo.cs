using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformDesignRepo : BaseRepository<DuraformDesign>, IDuraformDesignRepo
    {
        public DuraformDesignRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformDesign>> GetForOrderMenuAsync()
        {
            return await _dbSet
                .Include(x => x.FixedEdgeProfile)
                .Include(x => x.DefaultEdgeProfile)
                .OrderBy(x => x.Name)
                .ToListAsync();
        }
    }
}