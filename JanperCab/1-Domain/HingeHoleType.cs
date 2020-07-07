using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class HingeHoleType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisabled { get; set; }
        public ICollection<DuraformForm> DuraformForms { get; set; }

        public HingeHoleType()
        {
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}