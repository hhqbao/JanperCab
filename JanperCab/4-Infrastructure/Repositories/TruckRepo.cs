using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class TruckRepo : BaseRepository<Truck>, ITruckRepo
    {
        public TruckRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}