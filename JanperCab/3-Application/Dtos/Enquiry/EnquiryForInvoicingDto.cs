using System;

namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryForInvoicingDto
    {
        public int Id { get; set; }

        public string JobType { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public string CustomerName { get; set; }

        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }
    }
}