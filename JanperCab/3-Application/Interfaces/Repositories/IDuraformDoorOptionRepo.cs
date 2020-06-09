using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformDoorOptionRepo : IBaseRepository<DuraformDoorOption>
    {
        Task<List<DuraformDoorOption>> GetAllActiveAsync();
    }
}