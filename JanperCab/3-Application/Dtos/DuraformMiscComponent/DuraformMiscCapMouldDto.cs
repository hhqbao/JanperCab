using _1_Domain;
using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformMiscComponent
{
    public class DuraformMiscCapMouldDto : DuraformMiscComponentDto
    {
        public CapMouldSizeEnum Size { get; set; }

        public bool IsRaw { get; set; }
    }
}