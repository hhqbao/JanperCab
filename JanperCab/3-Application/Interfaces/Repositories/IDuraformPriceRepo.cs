using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformPriceRepo : IBaseRepository<DuraformPriceGrid>
    {
        Task<List<DuraformPriceGrid>> GetByFinishAndSerieAsync(int finishId, int serieId);

        Task SavePriceGridsAsync(List<DuraformPriceGrid> priceGrids);
    }
}