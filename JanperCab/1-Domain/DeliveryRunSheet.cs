using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DeliveryRunSheet
    {
        public int Id { get; set; }

        public int DriverId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }


        public virtual Driver Driver { get; set; }

        public virtual ICollection<Enquiry> Enquiries { get; set; }


        public DeliveryRunSheet()
        {
            CreatedDate = DateTime.Now;
            Enquiries = new Collection<Enquiry>();
        }
    }
}