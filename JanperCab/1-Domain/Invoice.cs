using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Invoice
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


        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal TotalPrice { get; set; }


        public virtual Enquiry Enquiry { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual ICollection<InvoiceComponent> InvoiceComponents { get; set; }

        public Invoice()
        {
            CreatedDate = DateTime.Now;
            InvoiceComponents = new Collection<InvoiceComponent>();
        }

        public Invoice(Enquiry enquiry) : this()
        {
            EnquiryId = enquiry.Id;

            CustomerId = enquiry.Customer.ManagerId ?? enquiry.CustomerId;
            CustomerReference = enquiry.CustomerReference;

            DoorType = enquiry.DoorType;
            DoorColor = enquiry.DoorColor;

            InvoiceTo = enquiry.InvoiceTo;
            InvoiceAddress = enquiry.InvoiceAddress;
            InvoiceSuburb = enquiry.InvoiceSuburb;
            InvoiceState = enquiry.InvoiceState;
            InvoicePostcode = enquiry.InvoicePostcode;

            DeliveryTo = enquiry.DeliveryTo;
            DeliveryAddress = enquiry.DeliveryAddress;
            DeliverySuburb = enquiry.DeliverySuburb;
            DeliveryState = enquiry.DeliveryState;
            DeliveryPostcode = enquiry.DeliveryPostcode;

            GstRate = enquiry.GstRate;
            DiscountRate = enquiry.DiscountRate;
            DeliveryFee = enquiry.DeliveryFee;
            SubTotal = enquiry.SubTotal;
            TotalGst = enquiry.TotalGst;
            TotalPrice = enquiry.TotalPrice ?? 0;


            foreach (var component in enquiry.GenerateComponentsForInvoice())
            {
                InvoiceComponents.Add(component);
            }
        }
    }
}