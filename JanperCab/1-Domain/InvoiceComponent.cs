namespace _1_Domain
{
    public class InvoiceComponent
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalPrice { get; set; }

        public virtual Invoice Invoice { get; set; }

        public InvoiceComponent()
        {

        }

        public InvoiceComponent(DuraformComponent component)
        {
            Quantity = component.Quantity;
            Description = component.GetInvoiceDescription();
            UnitPrice = component.UnitPrice;
            SubTotal = component.SubTotal;
            TotalDiscount = component.TotalDiscount;
            TotalPrice = component.TotalPrice;
        }

        public InvoiceComponent(DuraformMiscComponent miscItem)
        {
            Quantity = miscItem.Quantity;
            Description = miscItem.GetInvoiceDescription();
            UnitPrice = miscItem.UnitPrice;
            SubTotal = miscItem.SubTotal;
            TotalDiscount = miscItem.TotalDiscount;
            TotalPrice = miscItem.TotalPrice;
        }
    }
}