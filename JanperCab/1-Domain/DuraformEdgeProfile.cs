using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformEdgeProfile
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool? ForcedValuePerItem { get; set; }


        public ICollection<DuraformDesign> DuraformDesignsWithFixed { get; set; }

        public ICollection<DuraformDesign> DuraformDesignsWithDefault { get; set; }

        public DuraformEdgeProfile()
        {
            DuraformDesignsWithFixed = new Collection<DuraformDesign>();
            DuraformDesignsWithDefault = new Collection<DuraformDesign>();
        }
    }
}