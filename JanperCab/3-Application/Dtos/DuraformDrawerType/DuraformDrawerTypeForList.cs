using _1_Domain;

namespace _3_Application.Dtos.DuraformDrawerType
{
    public class DuraformDrawerTypeForList
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DrawerDesign DrawerDesign { get; set; }

        public bool IsDisabled { get; set; }
    }
}