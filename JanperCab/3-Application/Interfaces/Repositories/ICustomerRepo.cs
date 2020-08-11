using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface ICustomerRepo : IBaseRepository<Customer>
    {
        Task<Distributor> GetDistributorAsync(int id);

        Task<CabinetMaker> GetCabinetMakerAsync(int id);

        Task<List<CabinetMaker>> GetCabinetMakersAsync(int distributorId);
    }
}