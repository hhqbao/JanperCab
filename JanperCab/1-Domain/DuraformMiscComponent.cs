namespace _1_Domain
{
    public abstract class DuraformMiscComponent
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalPrice { get; set; }


        public abstract string GetInvoiceDescription();

        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}