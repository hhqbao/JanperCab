namespace _3_Application.Dtos.Enquiry
{
    public abstract class EnquiryPriceDto
    {
        public int Id { get; set; }

        public bool ToBePriced { get; set; }

        public bool IsShippingRequired { get; set; }

        public bool HasFixedPrice { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal? TotalPrice { get; set; }
    }
}