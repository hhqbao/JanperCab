using _1_Domain.Enum;

namespace _1_Domain
{
    public class Distributor : Customer
    {
        public Distributor()
        {
            CustomerType = CustomerType.Distributor;
        }
    }
}