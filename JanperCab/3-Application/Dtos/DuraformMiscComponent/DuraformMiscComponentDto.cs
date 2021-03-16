namespace _3_Application.Dtos.DuraformMiscComponent
{
    public abstract class DuraformMiscComponentDto
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}