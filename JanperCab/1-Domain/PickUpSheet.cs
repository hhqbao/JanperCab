using System;
using System.Linq;

namespace _1_Domain
{
    public class PickUpSheet : DeliverySheet
    {
        public int CustomerId { get; set; }

        public string ApplicationUserId { get; set; }


        public virtual Customer Customer { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }


        public override bool IsEditable => !LockedDate.HasValue && !CompletedDate.HasValue;

        public override void AddOrder(Enquiry enquiry)
        {
            if (enquiry.CustomerId != CustomerId)
                throw new Exception("Cannot pick up other customer's order");

            enquiry.ProcessDelivering(this);
        }

        public override void Complete()
        {
            LockedDate = DateTime.Now;
            CompletedDate = DateTime.Now;

            var enquiries = ProcessDeliverings.Select(x => x.Enquiry).ToList();

            foreach (var enquiry in enquiries)
            {
                enquiry.CompleteDelivering();

                enquiry.RemoveDeliveryFee();
            }
        }
    }
}