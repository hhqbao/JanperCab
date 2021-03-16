namespace _1_Domain
{
    public abstract class DuraformMiscComponent
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }



        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}