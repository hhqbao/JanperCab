using System;

namespace _1_Domain
{
    public class CashOrderPayment
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int EnquiryId { get; set; }

        public decimal Amount { get; set; }


        public virtual Enquiry Enquiry { get; set; }

        public CashOrderPayment()
        {
            CreatedDate = DateTime.Now;
        }
    }
}