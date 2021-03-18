using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public abstract class DuraformProcess
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public DuraformProcessEnum Process { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }


        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}