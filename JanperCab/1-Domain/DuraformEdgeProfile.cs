using System.Collections.Generic;
using System.Collections.ObjectModel;


namespace _1_Domain
{
    public class DuraformEdgeProfile
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool? ForceTop { get; set; }

        public bool? ForceBottom { get; set; }

        public bool? ForceLeft { get; set; }

        public bool? ForceRight { get; set; }

        public bool HideInDoor { get; set; }

        public bool HideInPantry { get; set; }

        public bool HideInPanel { get; set; }

        public bool HideInDrawer { get; set; }

        public string ICB_EDGE_TOOLING { get; set; }

        public int? UserVar1 { get; set; }

        public int? UserVar2 { get; set; }

        public int? UserVar3 { get; set; }

        public int? UserVar4 { get; set; }

        public int? UserVar5 { get; set; }

        public int? UserVar6 { get; set; }

        public int? UserVar7 { get; set; }

        public int? UserVar8 { get; set; }


        public virtual ICollection<DuraformDesign> DuraformDesignsWithDefault { get; set; }

        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }

        public virtual ICollection<DuraformDesignEdgeProfile> DuraformDesignEdgeProfiles { get; set; }

        public virtual ICollection<DuraformEnquiry> DuraformEnquiries { get; set; }

        public DuraformEdgeProfile()
        {
            DuraformDesignsWithDefault = new Collection<DuraformDesign>();
            DuraformComponents = new Collection<DuraformComponent>();
            DuraformDesignEdgeProfiles = new Collection<DuraformDesignEdgeProfile>();
            DuraformEnquiries = new Collection<DuraformEnquiry>();
        }
    }
}