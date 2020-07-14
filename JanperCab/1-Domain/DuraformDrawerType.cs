using System.Collections.Generic;

namespace _1_Domain
{
    public enum DrawerDesign
    {
        Single = 1,
        PotDrawers = 2,
        IndividualEqualShields = 3,
        IndividualEqualDrawers = 4
    }

    public class DuraformDrawerType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DrawerDesign DrawerDesign { get; set; }

        public bool IsDisabled { get; set; }


        public virtual ICollection<DuraformDrawer> DuraformDrawers { get; set; }
    }
}