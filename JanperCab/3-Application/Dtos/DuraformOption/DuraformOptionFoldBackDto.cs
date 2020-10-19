using _1_Domain;

namespace _3_Application.Dtos.DuraformOption
{
    public class DuraformOptionFoldBackDto : DuraformOptionDto
    {
        public bool HasProfile { get; set; }

        public decimal LeftLength { get; set; }

        public decimal RightLength { get; set; }

        public decimal Thickness { get; set; }

        public FoldingType FoldingType { get; set; }
    }
}