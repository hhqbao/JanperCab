using _1_Domain;
using _1_Domain.Enum;

namespace _3_Application.Dtos.Customer
{
    public class CabinetMakerDto : CustomerDto
    {
        public CabinetMakerDto()
        {
            CustomerType = CustomerType.CabinetMaker;
        }
    }
}