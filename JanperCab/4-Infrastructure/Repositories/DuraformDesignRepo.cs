using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DuraformDesignRepo : BaseRepository<DuraformDesign>, IDuraformDesignRepo
    {
        public DuraformDesignRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}