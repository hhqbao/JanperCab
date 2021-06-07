using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class PickUpSheet
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsCompleted { get; set; }

        public int CustomerId { get; set; }

        public string ApplicationUserId { get; set; }


        public virtual Customer Customer { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual ICollection<Enquiry> Enquiries { get; set; }


        public PickUpSheet()
        {
            CreatedDate = DateTime.Now;
            Enquiries = new Collection<Enquiry>();
        }

        public void Complete()
        {
            foreach (var enquiry in Enquiries)
            {
                enquiry.CompletePickingUp();

                enquiry.SubTotal -= enquiry.DeliveryFee;
                enquiry.DeliveryFee = 0;

                enquiry.TotalGst = Math.Round(enquiry.SubTotal / 10, 2);
                enquiry.TotalPrice = enquiry.SubTotal + enquiry.TotalGst;
            }

            IsCompleted = true;
        }
    }
}