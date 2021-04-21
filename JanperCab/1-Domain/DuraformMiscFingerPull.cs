using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformMiscFingerPull : DuraformMiscComponent
    {
        public FingerPullTypeEnum Type { get; set; }

        public bool IsRaw { get; set; }

        public override string GetInvoiceDescription()
        {
            var desc = $"Finger Pull - Type {Type} - ";

            desc += IsRaw ? "RAW" : "PRESSED";

            return desc;
        }
    }
}