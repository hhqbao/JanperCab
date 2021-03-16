using _1_Domain;
using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformMiscPrice
{
    public class DuraformMiscPriceHeatStripDto : DuraformMiscPriceDto
    {
        public HeatStripSizeEnum HeatStripSize { get; set; }
    }
}