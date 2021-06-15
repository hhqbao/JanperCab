using System.Collections.Generic;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.DuraformMiscComponent;

namespace _3_Application.Dtos.Enquiry
{
    public class DuraformEnquiryPriceDto : EnquiryPriceDto
    {
        public ICollection<DuraformComponentPriceDto> DuraformComponents { get; set; }

        public ICollection<DuraformMiscComponentPriceDto> MiscComponents { get; set; }
    }
}