using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class InvoiceRepo : BaseRepository<Invoice>, IInvoiceRepo
    {
        public InvoiceRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}