using _1_Domain;

namespace _3_Application.Dtos.Customer
{
    public class DistributorDto : CustomerDto
    {
        public DistributorDto()
        {
            CustomerType = CustomerType.Distributor;
        }
    }
}