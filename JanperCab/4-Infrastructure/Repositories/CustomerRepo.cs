using _1_Domain;
using _3_Application.Dtos.Common;
using _3_Application.Interfaces.Repositories;
using IdentityServer4.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using _1_Domain.Enum;

namespace _4_Infrastructure.Repositories
{
    public class CustomerRepo : BaseRepository<Customer>, ICustomerRepo
    {
        public CustomerRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Customer> GetAsync(object id, ApplicationUser currentUser)
        {
            var customer = await _dbSet.FindAsync(id);

            if (customer == null) return null;

            return currentUser.Customer switch
            {
                Manufacturer _ => customer,
                Distributor distributor => (customer.Id == distributor.Id || customer.ManagerId == distributor.Id
                    ? customer
                    : null),
                CabinetMaker cabinetMaker => (customer.Id == cabinetMaker.Id ? customer : null),
                _ => throw new ArgumentOutOfRangeException()
            };
        }


        public async Task<ItemList<Customer>> GetCustomersAsync(ApplicationUser currentUser, string search, string sortBy, string direction, int page = 0, int take = 20)
        {
            var query = _dbSet.Where(x => x.CustomerType != CustomerType.Manufacturer);

            switch (currentUser.Customer)
            {
                case CabinetMaker cabinetMaker:
                    throw new Exception("Unauthorized Action! Not For Cabinet Maker");
                case Distributor distributor:
                    query = query.Where(x => x.ManagerId == distributor.Id);
                    break;
                case Manufacturer _:
                    break;
            }

            if (!search.IsNullOrEmpty())
                query = query.Where(x => x.Name.Contains(search.Replace("@@@", "&")));

            switch (sortBy)
            {
                case "type":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.CustomerType)
                        : query.OrderByDescending(x => x.CustomerType);
                    break;
                case "email":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.Email)
                        : query.OrderByDescending(x => x.Email);
                    break;
                case "invoice":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.InvoiceAddress)
                        : query.OrderByDescending(x => x.InvoiceAddress);
                    break;
                case "delivery":
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.DeliveryAddress)
                        : query.OrderByDescending(x => x.DeliveryAddress);
                    break;
                default:
                    query = direction.Equals("asc")
                        ? query.OrderBy(x => x.Name)
                        : query.OrderByDescending(x => x.Name);
                    break;
            }

            var totalCount = await query.CountAsync();
            var customer = await query.Skip(page * take).Take(take).ToListAsync();

            var itemList = new ItemList<Customer> { Items = customer, TotalItemCount = totalCount };

            return itemList;
        }
    }
}