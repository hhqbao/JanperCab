using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class MiscItem
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisabled { get; set; }

        public virtual ICollection<DuraformMisc> DuraformMiscs { get; set; }

        public MiscItem()
        {
            DuraformMiscs = new Collection<DuraformMisc>();
        }
    }
}