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


        public int CabinetMakerId { get; set; }

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


        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }


        public virtual Enquiry Enquiry { get; set; }

        public virtual CabinetMaker CabinetMaker { get; set; }

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

            CabinetMakerId = duraformEnquiry.CabinetMakerId;
            CustomerReference = duraformEnquiry.CustomerReference;

            DoorType = duraformEnquiry.DoorType;
            DoorColor = duraformEnquiry.DoorColor;

            InvoiceTo = duraformEnquiry.InvoiceTo;
            InvoiceAddress = duraformEnquiry.InvoiceAddress;
            InvoiceSuburb = duraformEnquiry.InvoiceSuburb;
            InvoiceState = duraformEnquiry.InvoiceState;
            InvoicePostcode = duraformEnquiry.InvoicePostcode;

            DeliveryTo = duraformEnquiry.DeliveryTo;
            DeliveryAddress = duraformEnquiry.DeliveryAddress;
            DeliverySuburb = duraformEnquiry.DeliverySuburb;
            DeliveryState = duraformEnquiry.DeliveryState;
            DeliveryPostcode = duraformEnquiry.DeliveryPostcode;

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