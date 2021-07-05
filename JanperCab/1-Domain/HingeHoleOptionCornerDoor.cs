using _1_Domain.Enum;

namespace _1_Domain
{
    public class HingeHoleOptionCornerDoor : HingeHoleOption
    {
        public decimal LeftTop { get; set; }

        public decimal LeftBottom { get; set; }

        public decimal RightTop { get; set; }

        public decimal RightBottom { get; set; }

        public HingeHoleOptionCornerDoor()
        {
            HingeHoleStyle = HingeHoleStyleEnum.CornerDoor;
        }
    }
}