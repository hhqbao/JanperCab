namespace _3_Application.Dtos.DuraformComponent
{
    public class DuraformComponentPriceDto
    {
        public int Id { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalPrice { get; set; }
    }
}