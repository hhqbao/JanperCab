using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        ICustomerRepo Customers { get; }

        ICustomerCategoryRepo CustomerCategories { get; }

        IDuraformSerieRepo DuraformSeries { get; }

        IDuraformDesignRepo DuraformDesigns { get; }

        IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        IDuraformWrapColorRepo DuraformWrapColors { get; }

        IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        IDuraformArchRepo DuraformArches { get; }

        IPantryDoorChairRailTypeRepo PantryDoorChairRailTypes { get; }

        IDuraformDrawerTypeRepo DuraformDrawerTypes { get; }

        IDuraformOptionTypeRepo DuraformOptionTypes { get; }

        IProcessRepo Processes { get; }

        IOnHoldComponentRepo OnHoldComponents { get; }

        IHingeHoleTypeRepo HingeHoleTypes { get; }

        IHingeHoleStyleRepo HingeHoleStyles { get; }

        IEnquiryRepo Enquiries { get; }

        IApplicationFileRepo ApplicationFiles { get; }

        IDuraformPriceRepo DuraformPrices { get; }

        IDuraformMiscPriceRepo DuraformMiscPrices { get; }

        IMachineRepo Machines { get; }

        IDriverRepo Drivers { get; }

        ITruckRepo Trucks { get; }

        IDeliverySheetRepo DeliverySheets { get; }

        IInvoiceRepo Invoices { get; }

        Task ExecuteCommandAsync(string command);

        Task<int> CompleteAsync();
    }
}