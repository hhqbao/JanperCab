using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformDrawerType
{
    public class DuraformDrawerTypeDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DrawerDesign DrawerDesign { get; set; }

        public bool IsDisabled { get; set; }
    }
}