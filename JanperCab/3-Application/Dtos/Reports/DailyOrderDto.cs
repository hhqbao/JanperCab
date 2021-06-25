using _1_Domain;
using System;

namespace _3_Application.Dtos.Reports
{
    public class DailyOrderDto
    {
        public int EnquiryId { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Type { get; set; }

        public string Door { get; set; }

        public string Colour { get; set; }

        public int DuraformParts { get; set; }

        public int JanperEdgeParts { get; set; }

        public int RouteOnlyParts { get; set; }

        public int FlatpackParts { get; set; }

        public string CustomerName { get; set; }

        public string OrderReference { get; set; }

        public bool HasFixedPrice { get; set; }

        public decimal TotalPrice { get; set; }

        public DailyOrderDto(_1_Domain.Enquiry enquiry)
        {
            EnquiryId = enquiry.Id;
            CreatedDate = enquiry.CreatedDate;
            Type = enquiry.JobType;
            Door = enquiry.DoorType;
            Colour = enquiry.DoorColor;
            DuraformParts = 0;
            JanperEdgeParts = 0;
            RouteOnlyParts = 0;
            FlatpackParts = 0;
            CustomerName = enquiry.Customer.Name;
            OrderReference = enquiry.CustomerReference;
            HasFixedPrice = enquiry.HasFixedPrice;
            TotalPrice = enquiry.TotalPrice ?? -1;

            switch (enquiry)
            {
                case DuraformEnquiry duraform:
                    DuraformParts = duraform.IsRoutingOnly ? 0 : duraform.PartCount;
                    RouteOnlyParts = !duraform.IsRoutingOnly ? 0 : duraform.PartCount;
                    break;
                default:
                    throw new NotImplementedException("Order Type Supported");
            }
        }
    }
}