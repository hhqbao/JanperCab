using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformMiscFingerPull : DuraformMiscComponent
    {
        public FingerPullTypeEnum Type { get; set; }

        public bool IsRaw { get; set; }
    }
}