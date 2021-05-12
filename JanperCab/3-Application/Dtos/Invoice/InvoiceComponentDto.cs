namespace _3_Application.Dtos.Invoice
{
    public class InvoiceComponentDto
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalPrice { get; set; }
    }
}