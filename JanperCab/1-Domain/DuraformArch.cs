using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformArch
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public virtual ICollection<DuraformEnquiry> DuraformEnquiries { get; set; }

        public DuraformArch()
        {
            DuraformEnquiries = new Collection<DuraformEnquiry>();
        }
    }
}