using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.Invoice
{
    public class InvoiceDto
    {
        public string Id { get; set; }

        public int EnquiryId { get; set; }

        public DateTime CreatedDate { get; set; }

        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }


        public ICollection<InvoiceComponentDto> InvoiceComponents { get; set; }

        public InvoiceDto()
        {
            InvoiceComponents = new Collection<InvoiceComponentDto>();
        }
    }
}