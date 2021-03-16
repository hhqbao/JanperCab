using _1_Domain;
using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformMiscComponent
{
    public class DuraformMiscHeatStripDto : DuraformMiscComponentDto
    {
        public HeatStripTypeEnum Type { get; set; }

        public HeatStripSizeEnum Size { get; set; }
    }
}