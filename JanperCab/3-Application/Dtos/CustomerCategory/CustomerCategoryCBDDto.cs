using _1_Domain.Enum;

namespace _3_Application.Dtos.CustomerCategory
{
    public class CustomerCategoryCBDDto : CustomerCategoryDto
    {
        public CustomerCategoryCBDDto()
        {
            CategoryType = CustomerCategoryType.CBD;
        }
    }
}