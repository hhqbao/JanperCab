using System;

namespace _1_Domain
{
    public enum EnquiryTypeEnum
    {
        Draft = 1,
        Quote = 2,
        Order = 3
    }

    public abstract class Enquiry
    {
        public int Id { get; set; }

        public string CustomerReference { get; set; }

        public EnquiryTypeEnum EnquiryType { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public string CreatorId { get; set; }


        public int DistributorId { get; set; }

        public int CabinetMakerId { get; set; }

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

        public bool NotEditable { get; set; }

        public decimal? TotalPrice { get; set; }


        protected Enquiry()
        {
            EnquiryType = EnquiryTypeEnum.Draft;
            CreatedDate = DateTime.Now;
        }
    }

    public class DuraformEnquiry : Enquiry
    {
        public int DuraformDesignId { get; set; }

        public int DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }
    }
}
