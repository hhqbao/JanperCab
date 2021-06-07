using _1_Domain;
using _1_Domain.Enum;

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