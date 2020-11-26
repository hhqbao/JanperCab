using _1_Domain;

namespace _3_Application.Dtos.HingeHoleOption
{
    public class HingeHoleOptionDto
    {
        public int Id { get; set; }

        public HingeHoleStyle HingeHoleStyle { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal? Bottom { get; set; }
    }
}