using _1_Domain.Enum;
using _3_Application.Dtos.Customer;

namespace _3_Application.Dtos.DeliverySheet
{
    public class PickUpSheetDto : DeliverySheetDto
    {
        public int CustomerId { get; set; }

        public CustomerDto Customer { get; set; }

        public PickUpSheetDto()
        {
            DeliveryMethod = DeliveryMethodEnum.PickUp;
        }
    }
}