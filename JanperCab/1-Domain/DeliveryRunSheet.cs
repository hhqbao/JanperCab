using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace _1_Domain
{
    public class DeliveryRunSheet
    {
        public int Id { get; set; }

        public int DriverId { get; set; }

        public int TruckId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }

        public DateTime? DeliveredDate { get; set; }

        public bool IsEditable => !LockedDate.HasValue && !DeliveredDate.HasValue;


        public virtual Driver Driver { get; set; }

        public virtual Truck Truck { get; set; }

        public virtual ICollection<Enquiry> Enquiries { get; set; }


        public DeliveryRunSheet()
        {
            CreatedDate = DateTime.Now;
            Enquiries = new Collection<Enquiry>();
        }

        public DateTime ConfirmDelivery()
        {
            DeliveredDate = DateTime.Now;

            foreach (var enquiry in Enquiries)
            {
                enquiry.CompleteDelivering();

                if (!Enquiries.Any(x => x.Id != enquiry.Id &&
                                        x.CustomerId == enquiry.CustomerId &&
                                        x.FullDeliveryAddress.Equals(enquiry.FullDeliveryAddress) &&
                                        x.DeliveryFee > 0)) continue;

                enquiry.SubTotal -= enquiry.DeliveryFee;
                enquiry.DeliveryFee = 0;

                enquiry.TotalGst = Math.Round(enquiry.SubTotal / 10, 2);
                enquiry.TotalPrice = enquiry.SubTotal + enquiry.TotalGst;
            }

            return DeliveredDate.Value;
        }
    }
}