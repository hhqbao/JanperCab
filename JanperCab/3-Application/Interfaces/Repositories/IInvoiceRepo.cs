using _1_Domain;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IInvoiceRepo : IBaseRepository<Invoice>
    {
        Task<int> GetNextAvailableInvoiceIdAsync();

        Task<Invoice> GetAsync(int id, Customer customer);

        Task<Invoice> GenerateAsync(Enquiry enquiry);
    }
}