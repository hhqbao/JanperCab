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

        IDuraformOrderRepo DuraformOrders { get; }

        IApplicationFileRepo ApplicationFiles { get; }

        Task ExecuteCommandAsync(string command);

        Task<int> CompleteAsync();
    }
}