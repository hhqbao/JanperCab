using _1_Domain.Enum;

namespace _1_Domain
{
    public class CustomerCategoryAccount : CustomerCategory
    {
        public int DurationInDays { get; set; }

        public CustomerCategoryAccount()
        {
            CategoryType = CustomerCategoryType.Account;
        }
    }
}