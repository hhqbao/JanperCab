using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class PantryDoorChairRailTypeRepo : BaseRepository<PantryDoorChairRailType>, IPantryDoorChairRailTypeRepo
    {
        public PantryDoorChairRailTypeRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<PantryDoorChairRailType>> GetAllActiveAsync()
        {
            return await _dbSet.Where(x => !x.IsDisabled).ToListAsync();
        }
    }
}