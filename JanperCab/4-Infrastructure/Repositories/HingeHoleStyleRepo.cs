using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class HingeHoleStyleRepo : BaseRepository<HingeHoleStyle>, IHingeHoleStyleRepo
    {
        public HingeHoleStyleRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}