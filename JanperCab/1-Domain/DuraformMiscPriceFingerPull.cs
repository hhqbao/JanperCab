namespace _1_Domain
{
    public class DuraformMiscPriceFingerPull : DuraformMiscPrice
    {
        public int? DuraformWrapTypeId { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }
    }
}