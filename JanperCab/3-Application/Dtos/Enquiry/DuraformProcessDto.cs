using System;
using _1_Domain.Enum;

namespace _3_Application.Dtos.Enquiry
{
    public class DuraformProcessDto
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public DuraformProcessEnum Process { get; set; }

        public DateTime? CompletedDate { get; set; }
    }
}