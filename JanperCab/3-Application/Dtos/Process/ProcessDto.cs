using _1_Domain.Enum;
using _3_Application.Dtos.OnHoldComponent;
using System;
using System.Collections.Generic;

namespace _3_Application.Dtos.Process
{
    public abstract class ProcessDto
    {
        public int Id { get; set; }

        public ProcessTypeEnum ProcessType { get; set; }

        public int EnquiryId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }


        public ICollection<OnHoldComponentDto> OnHoldComponents { get; set; }
    }
}