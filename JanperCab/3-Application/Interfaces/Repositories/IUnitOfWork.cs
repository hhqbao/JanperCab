using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        ICustomerRepo Customers { get; }

        IDuraformSerieRepo DuraformSeries { get; }

        IDuraformDesignRepo DuraformDesigns { get; }

        IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        IDuraformWrapColorRepo DuraformWrapColors { get; }

        IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        IDuraformArchRepo DuraformArches { get; }

        IPantryDoorChairRailTypeRepo PantryDoorChairRailTypes { get; }

        IDuraformDrawerTypeRepo DuraformDrawerTypes { get; }

        IDuraformOptionTypeRepo DuraformOptionTypes { get; }

        IHingeHoleTypeRepo HingeHoleTypes { get; }

        IHingeHoleStyleRepo HingeHoleStyles { get; }

        IEnquiryRepo Enquiries { get; }

        IApplicationFileRepo ApplicationFiles { get; }

        IDuraformPriceRepo DuraformPrices { get; }

        IDuraformMiscPriceRepo DuraformMiscPrices { get; }

        IMachineRepo Machines { get; }

        Task ExecuteCommandAsync(string command);

        Task<int> CompleteAsync();
    }
}