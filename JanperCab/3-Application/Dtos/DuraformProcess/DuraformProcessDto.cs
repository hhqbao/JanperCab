using System;
using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformProcess
{
    public abstract class DuraformProcessDto
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public DuraformProcessEnum Process { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }
    }
}