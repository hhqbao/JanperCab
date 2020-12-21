using _1_Domain;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Services
{
    public interface IMachineFileGenerator
    {
        Task ExportICBFileAsync(DuraformOrder order, string savePath);
    }
}