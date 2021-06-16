using _1_Domain.Enum;
using _3_Application.Dtos.Driver;
using _3_Application.Dtos.Truck;

namespace _3_Application.Dtos.DeliverySheet
{
    public class ShippingSheetDto : DeliverySheetDto
    {
        public int DriverId { get; set; }

        public int TruckId { get; set; }


        public DriverDto Driver { get; set; }

        public TruckDto Truck { get; set; }


        public ShippingSheetDto()
        {
            DeliveryMethod = DeliveryMethodEnum.Shipping;
        }
    }
}