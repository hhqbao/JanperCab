namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryForRunSheetDto
    {
        public int? DeliveryRunSheetId { get; set; }

        public int EnquiryId { get; set; }

        public int CabinetMakerId { get; set; }

        public string CabinetMakerName { get; set; }

        public string CustomerReference { get; set; }

        public string DoorType { get; set; }

        public string DoorColor { get; set; }

        public int PartCount { get; set; }

        public string Address { get; set; }

        public string Suburb { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public EnquiryForRunSheetDto(_1_Domain.Enquiry enquiry)
        {
            DeliveryRunSheetId = enquiry.DeliveryRunSheetId;
            EnquiryId = enquiry.Id;
            CabinetMakerId = enquiry.CabinetMakerId;
            CabinetMakerName = enquiry.CabinetMaker.Name;
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