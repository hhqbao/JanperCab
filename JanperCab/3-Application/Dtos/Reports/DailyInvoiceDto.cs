using System;

namespace _3_Application.Dtos.Reports
{
    public class DailyInvoiceDto
    {
        public int InvoiceId { get; set; }

        public int EnquiryId { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CustomerName { get; set; }

        public string OrderReference { get; set; }

        public string Type { get; set; }

        public bool HasFixedPrice { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }

        public DailyInvoiceDto(_1_Domain.Invoice invoice)
        {
            InvoiceId = invoice.Id;
            EnquiryId = invoice.EnquiryId;
            CreatedDate = invoice.CreatedDate;
            CustomerName = invoice.Customer.Name;
            OrderReference = invoice.CustomerReference;
            Type = invoice.Enquiry.JobType;
            HasFixedPrice = invoice.HasFixedPrice;
            DeliveryFee = invoice.DeliveryFee;
            SubTotal = invoice.SubTotal;
            TotalGst = invoice.TotalGst;
            TotalPrice = invoice.TotalPrice;
        }
    }
}