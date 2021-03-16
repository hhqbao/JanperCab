using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class HingeHoleType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisabled { get; set; }

        public virtual ICollection<DuraformEnquiry> DuraformEnquiries { get; set; }

        public HingeHoleType()
        {
            DuraformEnquiries = new Collection<DuraformEnquiry>();
        }
    }
}