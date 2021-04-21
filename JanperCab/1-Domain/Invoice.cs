using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Invoice
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


        public virtual Enquiry Enquiry { get; set; }

        public virtual ICollection<InvoiceComponent> InvoiceComponents { get; set; }

        public Invoice()
        {
            CreatedDate = DateTime.Now;
            InvoiceComponents = new Collection<InvoiceComponent>();
        }

        public Invoice(string invoiceId, DuraformEnquiry duraformEnquiry) : this()
        {
            Id = invoiceId;
            EnquiryId = duraformEnquiry.Id;
            GstRate = duraformEnquiry.GstRate;
            DiscountRate = duraformEnquiry.DiscountRate;
            DeliveryFee = duraformEnquiry.DeliveryFee;
            SubTotal = duraformEnquiry.SubTotal;
            TotalGst = duraformEnquiry.TotalGst;
            TotalPrice = duraformEnquiry.TotalPrice ?? 0;

            foreach (var component in duraformEnquiry.DuraformComponents)
            {
                InvoiceComponents.Add(new InvoiceComponent(component));
            }

            foreach (var miscItem in duraformEnquiry.MiscComponents)
            {
                InvoiceComponents.Add(new InvoiceComponent(miscItem));
            }
        }
    }
}