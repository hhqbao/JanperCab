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

        public ICustomerCategoryRepo CustomerCategories { get; }

        public IDuraformSerieRepo DuraformSeries { get; }

        public IDuraformDesignRepo DuraformDesigns { get; }

        public IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        public IDuraformWrapColorRepo DuraformWrapColors { get; }

        public IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        public IDuraformArchRepo DuraformArches { get; }

        public IPantryDoorChairRailTypeRepo PantryDoorChairRailTypes { get; }

        public IDuraformDrawerTypeRepo DuraformDrawerTypes { get; }

        public IDuraformOptionTypeRepo DuraformOptionTypes { get; }

        public IProcessRepo Processes { get; }

        public IOnHoldComponentRepo OnHoldComponents { get; }

        public IHingeHoleTypeRepo HingeHoleTypes { get; }

        public IHingeHoleStyleRepo HingeHoleStyles { get; }

        public IEnquiryRepo Enquiries { get; }

        public IApplicationFileRepo ApplicationFiles { get; }

        public IDuraformPriceRepo DuraformPrices { get; }

        public IDuraformMiscPriceRepo DuraformMiscPrices { get; }

        public IMachineRepo Machines { get; }

        public IDriverRepo Drivers { get; }

        public ITruckRepo Trucks { get; }

        public IDeliverySheetRepo DeliverySheets { get; }

        public IInvoiceRepo Invoices { get; }


        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            Customers = new CustomerRepo(_dbContext);
            CustomerCategories = new CustomerCategoryRepo(_dbContext);
            DuraformSeries = new DuraformSerieRepo(_dbContext);
            DuraformDesigns = new DuraformDesignRepo(_dbContext);
            DuraformWrapTypes = new DuraformWrapTypeRepo(_dbContext);
            DuraformWrapColors = new DuraformWrapColorRepo(_dbContext);
            DuraformEdgeProfiles = new DuraformEdgeProfileRepo(_dbContext);
            DuraformArches = new DuraformArchRepo(_dbContext);
            PantryDoorChairRailTypes = new PantryDoorChairRailTypeRepo(_dbContext);
            DuraformDrawerTypes = new DuraformDrawerTypeRepo(_dbContext);
            DuraformOptionTypes = new DuraformOptionTypeRepo(_dbContext);
            Processes = new ProcessRepo(_dbContext);
            OnHoldComponents = new OnHoldComponentRepo(_dbContext);
            HingeHoleTypes = new HingeHoleTypeRepo(_dbContext);
            HingeHoleStyles = new HingeHoleStyleRepo(_dbContext);
            Enquiries = new EnquiryRepo(_dbContext);
            ApplicationFiles = new ApplicationFileRepo(_dbContext);
            DuraformPrices = new DuraformPriceRepo(_dbContext);
            DuraformMiscPrices = new DuraformMiscPriceRepo(_dbContext);
            Machines = new MachineRepo(_dbContext);
            Drivers = new DriverRepo(_dbContext);
            Trucks = new TruckRepo(_dbContext);
            DeliverySheets = new DeliverySheetRepo(_dbContext);
            Invoices = new InvoiceRepo(_dbContext);
        }

        public async Task ExecuteCommandAsync(string command)
        {
            await _dbContext.Database.ExecuteSqlRawAsync(command);
        }

        public async Task<int> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}