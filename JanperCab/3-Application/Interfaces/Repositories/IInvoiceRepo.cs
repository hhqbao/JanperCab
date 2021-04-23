using _1_Domain;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IInvoiceRepo : IBaseRepository<Invoice>
    {
        Task<Invoice> GetAsync(string id, Customer customer);
    }
}