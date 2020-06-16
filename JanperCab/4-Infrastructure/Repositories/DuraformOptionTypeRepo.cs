using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DuraformOptionTypeRepo : BaseRepository<DuraformOptionType>, IDuraformOptionTypeRepo
    {
        public DuraformOptionTypeRepo(DbContext dbContext) : base(dbContext)
        {

        }
    }
}