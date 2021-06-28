using _1_Domain.Enum;
using System;
using System.Linq;

namespace _1_Domain
{
    public class ShippingSheet : DeliverySheet
    {
        public int DriverId { get; set; }

        public int TruckId { get; set; }


        public override bool IsEditable => !LockedDate.HasValue && !CompletedDate.HasValue;


        public virtual Driver Driver { get; set; }

        public virtual Truck Truck { get; set; }


        public ShippingSheet()
        {
            DeliveryMethod = DeliveryMethodEnum.Shipping;
        }

        public override void AddOrder(Enquiry enquiry)
        {
            if (!enquiry.IsShippingRequired)
                throw new Exception("Order cannot be shipped! Pick up only");

            enquiry.ProcessDelivering(this);
        }

        public override void Complete()
        {
            if (!LockedDate.HasValue) throw new Exception("Shipping Sheet Needs To Be Locked First");

            CompletedDate = DateTime.Now;

            var enquiries = ProcessDeliverings.Select(x => x.Enquiry).ToList();

            foreach (var enquiry in enquiries)
            {
                enquiry.CompleteDelivering();

                if (!enquiries.Any(x => x.Id != enquiry.Id &&
                                        x.CustomerId == enquiry.CustomerId &&
                                        x.FullDeliveryAddress.Equals(enquiry.FullDeliveryAddress) &&
                                        x.DeliveryFee > 0)) continue;

                if (!enquiry.HasBeenInvoiced)
                    enquiry.RemoveDeliveryFee();
            }
        }
    }
}