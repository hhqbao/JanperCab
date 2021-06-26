using _3_Application.Dtos.Customer;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.Invoice
{
    public class InvoiceDto
    {
        public int Id { get; set; }

        public int EnquiryId { get; set; }

        public DateTime CreatedDate { get; set; }


        public int CustomerId { get; set; }

        public string CustomerReference { get; set; }


        public string DoorType { get; set; }

        public string DoorColor { get; set; }


        public string InvoiceTo { get; set; }

        public string InvoiceAddress { get; set; }

        public string InvoiceSuburb { get; set; }

        public string InvoiceState { get; set; }

        public string InvoicePostcode { get; set; }


        public string DeliveryTo { get; set; }

        public string DeliveryAddress { get; set; }

        public string DeliverySuburb { get; set; }

        public string DeliveryState { get; set; }

        public string DeliveryPostcode { get; set; }


        public bool HasFixedPrice { get; set; }

        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }


        public CustomerDto Customer { get; set; }

        public ICollection<InvoiceComponentDto> InvoiceComponents { get; set; }

        public InvoiceDto()
        {
            InvoiceComponents = new Collection<InvoiceComponentDto>();
        }
    }
}