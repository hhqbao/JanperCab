namespace _1_Domain
{
    public enum HingeHoleStyle
    {
        Pair = 1,
        Left = 2,
        Right = 3,
        Draw = 4
    }

    public class HingeHoleOption
    {
        public int Id { get; set; }

        public HingeHoleStyle HingeHoleStyle { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal? Bottom { get; set; }

        public virtual DuraformComponentWithOptionAndHingeHole DuraformComponentWithOptionAndHingeHole { get; set; }
    }
}