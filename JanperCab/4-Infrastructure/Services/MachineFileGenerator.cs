using _1_Domain;
using _3_Application.Interfaces.Services;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Services
{
    public class MachineFileGenerator : IMachineFileGenerator
    {
        public async Task ExportICBFileAsync(DuraformOrder order, string savePath)
        {
            var icbFile = new ICBFileStructure();

            foreach (var component in order.DuraformComponents.OrderBy(x => x.SortNumber))
            {
                icbFile.IcbRows.AddRange(component.ExportIcbLinesStructure());
            }

            await File.WriteAllTextAsync($"{savePath}\\{order.OrderNumber}.csv", icbFile.ExportCSVString());
        }
    }
}