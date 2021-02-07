using _1_Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IDuraformPriceRepo : IBaseRepository<DuraformPriceGrid>
    {
        Task<List<DuraformWrapPriceGrid>> GetPressPriceGridAsync(int finishId, int serieId);

        Task<List<DuraformRouteOnlyPriceGrid>> GetRouteOnlyPriceGridAsync(int serieId);

        Task SavePriceGridsAsync(List<DuraformPriceGrid> priceGrids);
    }
}