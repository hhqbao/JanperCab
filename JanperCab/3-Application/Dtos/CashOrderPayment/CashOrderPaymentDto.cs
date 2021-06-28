using System;

namespace _3_Application.Dtos.CashOrderPayment
{
    public class CashOrderPaymentDto
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int EnquiryId { get; set; }

        public decimal Amount { get; set; }
    }
}