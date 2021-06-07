using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class PickUpSheetRepo : BaseRepository<PickUpSheet>, IPickUpSheetRepo
    {
        public PickUpSheetRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}