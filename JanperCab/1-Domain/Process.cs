using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public abstract class Process
    {
        public int Id { get; set; }

        public int EnquiryId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool IsCurrent { get; set; }


        public virtual ICollection<OnHoldComponent> OnHoldComponents { get; set; }

        protected Process()
        {
            OnHoldComponents = new Collection<OnHoldComponent>();
        }
    }
}