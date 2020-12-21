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

        public string ICB_EDGE_TOOLING { get; set; }


        public virtual ICollection<DuraformDesign> DuraformDesignsWithFixed { get; set; }

        public virtual ICollection<DuraformDesign> DuraformDesignsWithDefault { get; set; }

        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }

        public DuraformEdgeProfile()
        {
            DuraformDesignsWithFixed = new Collection<DuraformDesign>();
            DuraformDesignsWithDefault = new Collection<DuraformDesign>();
            DuraformForms = new Collection<DuraformForm>();
            DuraformComponents = new Collection<DuraformComponent>();
        }
    }
}