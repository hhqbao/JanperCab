namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryForRunSheetDto : EnquiryForSheetDto
    {
        public int? DeliveryRunSheetId { get; set; }

        public EnquiryForRunSheetDto(_1_Domain.Enquiry enquiry) : base(enquiry)
        {
            DeliveryRunSheetId = enquiry.DeliveryRunSheetId;
        }
    }
}