using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class CustomerRepo : BaseRepository<Customer>, ICustomerRepo
    {
        public CustomerRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Distributor> GetDistributorAsync(int id)
        {
            return await _dbSet.OfType<Distributor>().SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<CabinetMaker> GetCabinetMakerAsync(int id)
        {
            return await _dbSet.OfType<CabinetMaker>().SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<CabinetMaker>> GetCabinetMakersAsync(int distributorId)
        {
            return await _dbSet.OfType<CabinetMaker>().Where(x => x.DistributorId == distributorId).ToListAsync();
        }
    }
}