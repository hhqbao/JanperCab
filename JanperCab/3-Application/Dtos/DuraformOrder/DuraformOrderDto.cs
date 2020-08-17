using _1_Domain;
using _3_Application.Dtos.DuraformForm;

namespace _3_Application.Dtos.DuraformOrder
{
    public class DuraformOrderDto : DuraformFormDto
    {
        public int OrderNumber { get; set; }

        public OrderStatus OrderStatus { get; set; }
    }
}