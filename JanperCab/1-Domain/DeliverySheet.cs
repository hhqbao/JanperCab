using _1_Domain.Enum;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public abstract class DeliverySheet
    {
        public int Id { get; set; }

        public DeliveryMethodEnum DeliveryMethod { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }

        public DateTime? CompletedDate { get; set; }


        public abstract bool IsEditable { get; }


        public virtual ICollection<ProcessDelivering> ProcessDeliverings { get; set; }


        protected DeliverySheet()
        {
            CreatedDate = DateTime.Now;

            ProcessDeliverings = new Collection<ProcessDelivering>();
        }

        public abstract void AddOrder(Enquiry enquiry);

        public abstract void Complete();

    }
}