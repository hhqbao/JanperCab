using _1_Domain.Enum;

namespace _3_Application.Dtos.HingeHoleOption
{
    public class HingeHoleOptionSideDto : HingeHoleOptionDto
    {
        public HingeHoleDirectionEnum Direction { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? MiddleOne { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal? Bottom { get; set; }
    }
}