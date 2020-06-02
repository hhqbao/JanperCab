using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        IDuraformSerieRepo DuraformSeries { get; }

        IDuraformDoorRepo DuraformDoors { get; }

        IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        IDuraformWrapColorRepo DuraformWrapColors { get; }

        Task<int> CompleteAsync();
    }
}