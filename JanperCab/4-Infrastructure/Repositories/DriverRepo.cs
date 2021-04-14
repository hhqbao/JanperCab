using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DriverRepo : BaseRepository<Driver>, IDriverRepo
    {
        public DriverRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}