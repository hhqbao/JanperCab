using _1_Domain;
using System;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IApplicationFileRepo : IBaseRepository<ApplicationFile>
    {
        Task<DuraformFile> GetDuraformFileAsync(Guid id);
    }
}