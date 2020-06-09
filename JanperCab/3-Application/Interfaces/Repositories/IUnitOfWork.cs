using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        IDuraformSerieRepo DuraformSeries { get; }

        IDuraformDesignRepo DuraformDesigns { get; }

        IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        IDuraformWrapColorRepo DuraformWrapColors { get; }

        IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        IDuraformArchRepo DuraformArches { get; }

        IDuraformDoorOptionRepo DuraformDoorOptions { get; }

        Task<int> CompleteAsync();
    }
}