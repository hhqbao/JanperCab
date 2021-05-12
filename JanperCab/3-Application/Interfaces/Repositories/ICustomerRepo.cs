using _1_Domain;
using _3_Application.Dtos.Common;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface ICustomerRepo : IBaseRepository<Customer>
    {
        Task<Customer> GetAsync(object id, ApplicationUser currentUser);

        Task<ItemList<Customer>> GetCustomersAsync(ApplicationUser currentUser, string search, string sortBy,
            string direction, int page = 0, int take = 20);
    }
}