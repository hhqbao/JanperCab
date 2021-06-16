using _1_Domain.Enum;
using _3_Application.Dtos.Enquiry;
using System;
using System.Collections.Generic;

namespace _3_Application.Dtos.DeliverySheet
{
    public abstract class DeliverySheetDto
    {
        public int Id { get; set; }

        public DeliveryMethodEnum DeliveryMethod { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public List<EnquiryForSheetDto> EnquiriesForSheet { get; set; }


        protected DeliverySheetDto()
        {
            EnquiriesForSheet = new List<EnquiryForSheetDto>();
        }
    }
}