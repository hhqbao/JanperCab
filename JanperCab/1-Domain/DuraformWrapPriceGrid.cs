namespace _1_Domain
{
    public class DuraformWrapPriceGrid : DuraformPriceGrid
    {
        public int DuraformWrapTypeId { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }
    }
}