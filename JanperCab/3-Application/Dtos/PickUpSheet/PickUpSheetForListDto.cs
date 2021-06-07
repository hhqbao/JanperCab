using _3_Application.Dtos.Enquiry;
using System.Collections.Generic;

namespace _3_Application.Dtos.PickUpSheet
{
    public class PickUpSheetForListDto : PickUpSheetDto
    {
        public List<EnquiryForPickUpSheetDto> EnquiriesForPickUpSheet { get; set; }
    }
}