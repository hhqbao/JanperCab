using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformWrapTypeRepo : IBaseRepository<DuraformWrapType>
    {
        Task<List<DuraformWrapType>> GetForDoorAsync(int doorId);
    }
}