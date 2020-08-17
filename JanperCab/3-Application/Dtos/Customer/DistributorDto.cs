using _1_Domain;

namespace _3_Application.Dtos.Customer
{
    public class DistributorDto : CustomerDto
    {
        public int QuoteNumberSeed { get; set; }

        public int OrderNumberSeed { get; set; }


        public DistributorDto()
        {
            CustomerType = CustomerType.Distributor;
        }
    }
}