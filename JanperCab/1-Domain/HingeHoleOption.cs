using _1_Domain.Enum;

namespace _1_Domain
{
    public class HingeHoleOption
    {
        public int Id { get; set; }

        public HingeHoleStyleEnum HingeHoleStyle { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal? Bottom { get; set; }

        public virtual DuraformComponentWithOptionAndHingeHole DuraformComponentWithOptionAndHingeHole { get; set; }

        public virtual HingeHoleStyle HingeStyle { get; set; }
    }
}