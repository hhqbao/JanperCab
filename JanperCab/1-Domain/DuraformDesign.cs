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

        public DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public int? FixedEdgeProfileId { get; set; }

        public int? DefaultEdgeProfileId { get; set; }




        public virtual DuraformSerie DuraformSerie { get; set; }

        public virtual DuraformEdgeProfile FixedEdgeProfile { get; set; }

        public virtual DuraformEdgeProfile DefaultEdgeProfile { get; set; }

        public virtual ICollection<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }

        public DuraformDesign()
        {
            NotAvailableDesignWrapTypes = new Collection<NotAvailableDesignWrapType>();
        }
    }
}