using _2_Persistent;
using _3_Application.Interfaces.Repositories;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public IDuraformSerieRepo DuraformSeries { get; }

        public IDuraformDoorRepo DuraformDoors { get; }

        public IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        public IDuraformWrapColorRepo DuraformWrapColors { get; }

        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            DuraformSeries = new DuraformSerieRepo(_dbContext);
            DuraformDoors = new DuraformDoorRepo(_dbContext);
            DuraformWrapTypes = new DuraformWrapTypeRepo(_dbContext);
            DuraformWrapColors = new DuraformWrapColorRepo(_dbContext);
        }

        public async Task<int> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}