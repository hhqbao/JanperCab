using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class InvoiceRepo : BaseRepository<Invoice>, IInvoiceRepo
    {
        public InvoiceRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Invoice> GetAsync(string id, Customer customer)
        {
            var invoice = await GetAsync(id);

            if (invoice == null) return null;

            return customer switch
            {
                Manufacturer _ => invoice,
                Distributor distributor => (invoice.DistributorId == distributor.Id ? invoice : null),
                CabinetMaker cabinetMaker => (invoice.CabinetMakerId == cabinetMaker.Id ? invoice : null),
                _ => throw new NotImplementedException("Unsupported Customer Type")
            };
        }
    }
}