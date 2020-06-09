using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DuraformArchRepo : BaseRepository<DuraformArch>, IDuraformArchRepo
    {
        public DuraformArchRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}