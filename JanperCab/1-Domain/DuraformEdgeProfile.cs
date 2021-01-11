﻿using System.Collections.Generic;
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

        public string ICB_EDGE_TOOLING { get; set; }


        public virtual ICollection<DuraformDesign> DuraformDesignsWithDefault { get; set; }

        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }

        public virtual ICollection<DuraformDesignEdgeProfile> DuraformDesignEdgeProfiles { get; set; }

        public DuraformEdgeProfile()
        {
            DuraformDesignsWithDefault = new Collection<DuraformDesign>();
            DuraformForms = new Collection<DuraformForm>();
            DuraformComponents = new Collection<DuraformComponent>();
            DuraformDesignEdgeProfiles = new Collection<DuraformDesignEdgeProfile>();
        }
    }
}