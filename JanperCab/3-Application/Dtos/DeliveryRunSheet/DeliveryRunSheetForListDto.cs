using _3_Application.Dtos.Driver;
using _3_Application.Dtos.Enquiry;
using System.Collections.Generic;

namespace _3_Application.Dtos.DeliveryRunSheet
{
    public class DeliveryRunSheetForListDto : DeliveryRunSheetDto
    {
        public DriverDto Driver { get; set; }

        public List<EnquiryForRunSheetDto> EnquiriesForRunSheet { get; set; }
    }
}