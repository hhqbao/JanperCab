namespace _1_Domain
{
    public class DuraformMiscPriceCapMould : DuraformMiscPrice
    {
        public int? DuraformWrapTypeId { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }
    }
}