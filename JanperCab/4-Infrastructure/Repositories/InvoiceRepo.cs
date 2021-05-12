using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class InvoiceRepo : BaseRepository<Invoice>, IInvoiceRepo
    {
        public InvoiceRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> GetNextAvailableInvoiceIdAsync()
        {
            if (!await _dbSet.AnyAsync())
                return 1;

            var maxInvoiceId = await _dbSet.MaxAsync(x => x.Id);

            return maxInvoiceId + 1;
        }

        public async Task<Invoice> GetAsync(int id, Customer customer)
        {
            var invoice = await GetAsync(id);

            if (invoice == null) return null;

            return customer switch
            {
                Manufacturer _ => invoice,
                _ => invoice.CustomerId == customer.Id ? invoice : null
            };
        }

        public async Task<Invoice> GenerateAsync(Enquiry enquiry)
        {
            var invoice = new Invoice(enquiry) { Id = await GetNextAvailableInvoiceIdAsync() };

            return invoice;
        }
    }
}