using System;

namespace _3_Application.Dtos.Process
{
    public abstract class ProcessDto
    {
        public int Id { get; set; }

        public int EnquiryId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }
    }
}