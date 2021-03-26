using System;

namespace _1_Domain
{
    public abstract class Process
    {
        public int Id { get; set; }

        public int EnquiryId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }
    }
}