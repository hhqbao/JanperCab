using _2_Persistent;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public ICustomerRepo Customers { get; }

        public IDuraformSerieRepo DuraformSeries { get; }

        public IDuraformDesignRepo DuraformDesigns { get; }

        public IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        public IDuraformWrapColorRepo DuraformWrapColors { get; }

        public IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        public IDuraformArchRepo DuraformArches { get; }

        public IPantryDoorChairRailTypeRepo PantryDoorChairRailTypes { get; }

        public IDuraformDrawerTypeRepo DuraformDrawerTypes { get; }

        public IDuraformOptionTypeRepo DuraformOptionTypes { get; }

        public IHingeHoleTypeRepo HingeHoleTypes { get; }

        public IHingeHoleStyleRepo HingeHoleStyles { get; }

        public IDuraformOrderRepo DuraformOrders { get; }

        public IApplicationFileRepo ApplicationFiles { get; }

        public IDuraformPriceRepo DuraformPrices { get; }


        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            Customers = new CustomerRepo(_dbContext);
            DuraformSeries = new DuraformSerieRepo(_dbContext);
            DuraformDesigns = new DuraformDesignRepo(_dbContext);
            DuraformWrapTypes = new DuraformWrapTypeRepo(_dbContext);
            DuraformWrapColors = new DuraformWrapColorRepo(_dbContext);
            DuraformEdgeProfiles = new DuraformEdgeProfileRepo(_dbContext);
            DuraformArches = new DuraformArchRepo(_dbContext);
            PantryDoorChairRailTypes = new PantryDoorChairRailTypeRepo(_dbContext);
            DuraformDrawerTypes = new DuraformDrawerTypeRepo(_dbContext);
            DuraformOptionTypes = new DuraformOptionTypeRepo(_dbContext);
            HingeHoleTypes = new HingeHoleTypeRepo(_dbContext);
            HingeHoleStyles = new HingeHoleStyleRepo(_dbContext);
            DuraformOrders = new DuraformOrderRepo(_dbContext);
            ApplicationFiles = new ApplicationFileRepo(_dbContext);
            DuraformPrices = new DuraformPriceRepo(_dbContext);
        }

        public async Task ExecuteCommandAsync(string command)
        {
            await this._dbContext.Database.ExecuteSqlRawAsync(command);
        }

        public async Task<int> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}