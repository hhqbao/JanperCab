using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IPantryDoorChairRailTypeRepo : IBaseRepository<PantryDoorChairRailType>
    {
        Task<List<PantryDoorChairRailType>> GetAllActiveAsync();
    }
}