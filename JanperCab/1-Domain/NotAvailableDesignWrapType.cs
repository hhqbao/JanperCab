namespace _1_Domain
{
    public class NotAvailableDesignWrapType
    {
        public int DuraformDesignId { get; set; }

        public int DuraformWrapTypeId { get; set; }


        public virtual DuraformDesign DuraformDesign { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }
    }
}