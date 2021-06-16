namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryForSheetDto
    {
        public int EnquiryId { get; set; }

        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string CustomerReference { get; set; }

        public string DoorType { get; set; }

        public string DoorColor { get; set; }

        public int PartCount { get; set; }

        public string Address { get; set; }

        public string Suburb { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public EnquiryForSheetDto(_1_Domain.Enquiry enquiry)
        {
            EnquiryId = enquiry.Id;
            CustomerId = enquiry.CustomerId;
            CustomerName = enquiry.Customer.Name;
            CustomerReference = enquiry.CustomerReference;
            DoorType = enquiry.DoorType;
            DoorColor = enquiry.DoorColor;
            PartCount = enquiry.PartCount;
            Address = enquiry.DeliveryAddress;
            Suburb = enquiry.DeliverySuburb;
            State = enquiry.DeliveryState;
            Postcode = enquiry.DeliveryPostcode;
        }
    }
}