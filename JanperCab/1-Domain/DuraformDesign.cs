using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformDesign
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }

        public int DuraformSerieId { get; set; }

        public int DefaultEdgeProfileId { get; set; }

        public bool HasNoArch { get; set; }

        public decimal Thickness { get; set; }

        public string ICB_EXTERNAL_SHAPE_FILE { get; set; }

        public string ICB_TOOLING { get; set; }

        public string ICB_GLASS_TOOLING { get; set; }

        public int V_SPLIT_THICKNESS { get; set; }

        public int H_SPLIT_THICKNESS { get; set; }

        public int BT { get; set; }

        public int BB { get; set; }

        public int BL { get; set; }

        public int BR { get; set; }

        public decimal DrawerBorderOffset { get; set; }


        public virtual DuraformSerie DuraformSerie { get; set; }

        public virtual DuraformEdgeProfile DefaultEdgeProfile { get; set; }

        public virtual ICollection<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }

        public virtual ICollection<DuraformDesignEdgeProfile> AllowedEdgeProfiles { get; set; }

        public virtual ICollection<DuraformEnquiry> DuraformEnquiries { get; set; }


        public DuraformDesign()
        {
            NotAvailableDesignWrapTypes = new Collection<NotAvailableDesignWrapType>();
            AllowedEdgeProfiles = new Collection<DuraformDesignEdgeProfile>();
            DuraformEnquiries = new Collection<DuraformEnquiry>();
        }
    }
}