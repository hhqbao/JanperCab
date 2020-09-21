using _1_Domain;
using System;

namespace _3_Application.Dtos.DuraformOrder
{
    public class DuraformOrderForListDto
    {
        public Guid Id { get; set; }

        public int OrderNumber { get; set; }

        public string CustomerOrderNumber { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public int DistributorId { get; set; }

        public int CabinetMakerId { get; set; }

        public string DistributorName { get; set; }

        public string CabinetMakerName { get; set; }

        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}