using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class ApplicationFileRepo : BaseRepository<ApplicationFile>, IApplicationFileRepo
    {
        public ApplicationFileRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<DuraformFile> GetDuraformFileAsync(Guid id)
        {
            return await _dbSet.OfType<DuraformFile>().FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}