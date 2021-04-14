using _3_Application.Dtos.Driver;
using _3_Application.Dtos.Enquiry;
using System;
using System.Collections.Generic;

namespace _3_Application.Dtos.DeliveryRunSheet
{
    public class DeliveryRunSheetForListDto
    {
        public int Id { get; set; }

        public int DriverId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DriverDto Driver { get; set; }

        public List<EnquiryForRunSheetDto> EnquiriesForRunSheet { get; set; }
    }
}