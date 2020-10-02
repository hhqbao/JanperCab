using _1_Domain;
using _3_Application.Dtos.Common;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface ICustomerRepo : IBaseRepository<Customer>
    {
        Task<Distributor> GetDistributorAsync(int id);

        Task<CabinetMaker> GetCabinetMakerAsync(int id);

        Task<ItemList<Distributor>> GetDistributorsAsync(string search, string sortBy, string direction, int page = 0,
            int take = 20);

        Task<ItemList<CabinetMaker>> GetCabinetMakersAsync(int distributorId, string search, string sortBy, string direction,
            int page = 0, int take = 20);
    }
}