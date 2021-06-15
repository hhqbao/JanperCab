namespace _3_Application.Dtos.DuraformMiscComponent
{
    public class DuraformMiscComponentPriceDto
    {
        public int Id { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalPrice { get; set; }
    }
}