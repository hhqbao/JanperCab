using _1_Domain;

namespace _3_Application.Dtos.Customer
{
    public class DistributorDto : CustomerDto
    {
        public string Address { get; set; }

        public string Suburb { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public string ContactPerson { get; set; }


        public DistributorDto()
        {
            CustomerType = CustomerType.Distributor;
        }
    }
}