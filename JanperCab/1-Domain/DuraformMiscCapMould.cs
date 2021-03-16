using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformMiscCapMould : DuraformMiscComponent
    {
        public CapMouldSizeEnum Size { get; set; }

        public bool IsRaw { get; set; }
    }
}