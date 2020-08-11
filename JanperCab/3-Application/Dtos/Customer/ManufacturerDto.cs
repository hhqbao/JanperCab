using _1_Domain;

namespace _3_Application.Dtos.Customer
{
    public class ManufacturerDto : CustomerDto
    {
        public ManufacturerDto()
        {
            CustomerType = CustomerType.Manufacturer;
        }
    }
}