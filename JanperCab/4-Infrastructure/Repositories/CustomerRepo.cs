using _1_Domain;
using _3_Application.Dtos.Common;
using _3_Application.Interfaces.Repositories;
using IdentityServer4.Extensions;
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

        public async Task<List<Distributor>> GetDistributorsAsync()
        {
            return await _dbSet.OfType<Distributor>().ToListAsync();
        }

        public async Task<ItemList<CabinetMaker>> GetCabinetMakersAsync(int distributorId, string search, string sortBy, string direction, int page = 0, int take = 20)
        {
            var queryable = _dbSet.OfType<CabinetMaker>()
                .Where(x => x.DistributorId == distributorId);

            if (!search.IsNullOrEmpty())
                queryable = queryable.Where(x => x.Name.Contains(search));

            switch (sortBy)
            {
                case "email":
                    queryable = direction.Equals("asc")
                        ? queryable.OrderBy(x => x.Email)
                        : queryable.OrderByDescending(x => x.Email);
                    break;
                case "invoice":
                    queryable = direction.Equals("asc")
                        ? queryable.OrderBy(x => x.InvoiceAddress)
                        : queryable.OrderByDescending(x => x.InvoiceAddress);
                    break;
                case "delivery":
                    queryable = direction.Equals("asc")
                        ? queryable.OrderBy(x => x.DeliveryAddress)
                        : queryable.OrderByDescending(x => x.DeliveryAddress);
                    break;
                default:
                    queryable = direction.Equals("asc")
                        ? queryable.OrderBy(x => x.Name)
                        : queryable.OrderByDescending(x => x.Name);
                    break;
            }

            var totalCount = await queryable.CountAsync();
            var cabinetMakers = await queryable.Skip(page * take).Take(take).ToListAsync();

            var itemList = new ItemList<CabinetMaker> { Items = cabinetMakers, TotalItemCount = totalCount };

            return itemList;
        }
    }
}