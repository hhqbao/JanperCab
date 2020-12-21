using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformDrawerType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DrawerDesign DrawerDesign { get; set; }

        public bool IsDisabled { get; set; }


        public virtual ICollection<DuraformDrawer> DuraformDrawers { get; set; }
    }
}