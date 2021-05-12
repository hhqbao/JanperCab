using _1_Domain;

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