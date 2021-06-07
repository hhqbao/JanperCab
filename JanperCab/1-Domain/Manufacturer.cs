using _1_Domain.Enum;

namespace _1_Domain
{
    public class Manufacturer : Customer
    {
        public Manufacturer()
        {
            CustomerType = CustomerType.Manufacturer;
        }
    }
}