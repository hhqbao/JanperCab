using _1_Domain.Enum;

namespace _1_Domain
{
    public class HingeHoleOptionSide : HingeHoleOption
    {
        public HingeHoleDirectionEnum Direction { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? MiddleOne { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal? Bottom { get; set; }

        public HingeHoleOptionSide()
        {
            HingeHoleStyle = HingeHoleStyleEnum.Side;
        }
    }
}