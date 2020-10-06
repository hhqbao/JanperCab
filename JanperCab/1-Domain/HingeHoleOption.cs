namespace _1_Domain
{
    public class HingeHoleOption
    {
        public int Id { get; set; }

        public string Side { get; set; }

        public int Quantity { get; set; }

        public decimal Top { get; set; }

        public decimal? TopCenter { get; set; }

        public decimal? BottomCenter { get; set; }

        public decimal Bottom { get; set; }

        public virtual DuraformComponentWithOptionAndHingeHole DuraformComponentWithOptionAndHingeHole { get; set; }
    }
}