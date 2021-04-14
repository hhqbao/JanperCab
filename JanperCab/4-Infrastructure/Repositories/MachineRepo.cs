using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class MachineRepo : BaseRepository<Machine>, IMachineRepo
    {
        public MachineRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}