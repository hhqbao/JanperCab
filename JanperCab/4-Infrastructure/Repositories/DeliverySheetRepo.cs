using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class DeliverySheetRepo : BaseRepository<DeliverySheet>, IDeliverySheetRepo
    {
        public DeliverySheetRepo(DbContext dbContext) : base(dbContext)
        {

        }
    }
}