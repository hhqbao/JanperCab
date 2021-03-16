using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformMiscComponent
{
    public class DuraformMiscFingerPullDto : DuraformMiscComponentDto
    {
        public FingerPullTypeEnum Type { get; set; }

        public bool IsRaw { get; set; }
    }
}