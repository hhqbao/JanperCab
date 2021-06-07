using _1_Domain.Enum;

namespace _3_Application.Dtos.CustomerCategory
{
    public abstract class CustomerCategoryDto
    {
        public int Id { get; set; }

        public CustomerCategoryType CategoryType { get; set; }
    }
}