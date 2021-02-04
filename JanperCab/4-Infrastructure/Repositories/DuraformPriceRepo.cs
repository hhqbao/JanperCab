using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class DuraformPriceRepo : BaseRepository<DuraformPriceGrid>, IDuraformPriceRepo
    {
        public DuraformPriceRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DuraformPriceGrid>> GetByFinishAndSerieAsync(int finishId, int serieId)
        {
            var prices = await GetAllAsync(x => x.DuraformWrapTypeId == finishId && x.DuraformSerieId == serieId);

            return prices.OrderBy(x => x.MinHeight).ThenBy(x => x.MinWidth).ToList();
        }

        public async Task SavePriceGridsAsync(List<DuraformPriceGrid> priceGrids)
        {
            _dbSet.AddRange(priceGrids.Where(x => x.Id == 0));

            foreach (var priceGrid in priceGrids.Where(x => x.Id != 0))
            {
                var priceGridInDb = await _dbSet.FindAsync(priceGrid.Id);

                if (priceGridInDb == null)
                    continue;

                priceGridInDb.MinHeight = priceGrid.MinHeight;
                priceGridInDb.MaxHeight = priceGrid.MaxHeight;
                priceGridInDb.MinWidth = priceGrid.MinWidth;
                priceGridInDb.MaxWidth = priceGrid.MaxWidth;
                priceGridInDb.Price = priceGrid.Price;
            }
        }
    }
}