using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformMiscCapMould : DuraformMiscComponent
    {
        public CapMouldSizeEnum Size { get; set; }

        public bool IsRaw { get; set; }

        public override string GetInvoiceDescription()
        {
            var desc = $"Finger Pull - {Size}mm - ";

            desc += IsRaw ? "RAW" : "PRESSED";

            return desc;
        }
    }
}