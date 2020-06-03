using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformDoorRepo : IBaseRepository<DuraformDoor>
    {
        Task<List<DuraformDoor>> GetForOrderMenuAsync();
    }
}