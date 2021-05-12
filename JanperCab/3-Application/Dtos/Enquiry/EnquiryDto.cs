using _1_Domain.Enum;
using _3_Application.Dtos.Invoice;
using System;

namespace _3_Application.Dtos.Enquiry
{
    public abstract class EnquiryDto
    {
        public int Id { get; set; }

        public int CustomerId { set; get; }

        public int? ManagerId { get; set; }

        public string CustomerReference { get; set; }

        public EnquiryTypeEnum EnquiryType { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CreatorId { get; set; }


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

        public string DeliveryNote { get; set; }

        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal? TotalPrice { get; set; }

        public bool NotEditable { get; set; }

        public bool IsDeclineable { get; set; }

        public int? DeliveryRunSheetId { get; set; }


        public InvoiceDto Invoice { get; set; }
    }
}