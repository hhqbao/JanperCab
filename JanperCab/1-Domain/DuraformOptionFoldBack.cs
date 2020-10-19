namespace _1_Domain
{
    public enum FoldingType
    {
        Left = 1,
        Right = 2,
        Double = 3
    }

    public class DuraformOptionFoldBack : DuraformOption
    {
        public bool HasProfile { get; set; }

        public decimal LeftLength { get; set; }

        public decimal RightLength { get; set; }

        public decimal Thickness { get; set; }

        public FoldingType FoldingType { get; set; }
    }
}