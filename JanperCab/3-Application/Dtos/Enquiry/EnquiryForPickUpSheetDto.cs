namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryForPickUpSheetDto : EnquiryForSheetDto
    {
        public int? PickUpSheetId { get; set; }

        public EnquiryForPickUpSheetDto(_1_Domain.Enquiry enquiry) : base(enquiry)
        {
            PickUpSheetId = enquiry.PickUpSheetId;
        }
    }
}