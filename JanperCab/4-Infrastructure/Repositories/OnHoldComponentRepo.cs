using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class OnHoldComponentRepo : BaseRepository<OnHoldComponent>, IOnHoldComponentRepo
    {
        public OnHoldComponentRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}