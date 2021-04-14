using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DeliveryRunSheetRepo : BaseRepository<DeliveryRunSheet>, IDeliveryRunSheetRepo
    {
        public DeliveryRunSheetRepo(DbContext dbContext) : base(dbContext)
        {

        }
    }
}