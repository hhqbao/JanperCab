using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DuraformSerieRepo : BaseRepository<DuraformSerie>, IDuraformSerieRepo
    {
        public DuraformSerieRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}