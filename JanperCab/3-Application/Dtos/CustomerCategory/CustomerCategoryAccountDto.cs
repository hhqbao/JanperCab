using _1_Domain.Enum;

namespace _3_Application.Dtos.CustomerCategory
{
    public class CustomerCategoryAccountDto : CustomerCategoryDto
    {
        public int DurationInDays { get; set; }

        public CustomerCategoryAccountDto()
        {
            CategoryType = CustomerCategoryType.Account;
        }
    }
}