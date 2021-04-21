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

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }

        public DateTime? DeliveredDate { get; set; }

        public bool IsEditable => !LockedDate.HasValue && !DeliveredDate.HasValue;


        public virtual Driver Driver { get; set; }

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
                                        x.CabinetMakerId == enquiry.CabinetMakerId &&
                                        x.FullDeliveryAddress.Equals(enquiry.FullDeliveryAddress) &&
                                        x.DeliveryFee == 30)) continue;

                enquiry.DeliveryFee = 0;
                enquiry.SubTotal -= 30;
                enquiry.TotalGst = Math.Round(enquiry.SubTotal / 10, 2);
                enquiry.TotalPrice = enquiry.SubTotal + enquiry.TotalGst;
            }

            return DeliveredDate.Value;
        }
    }
}