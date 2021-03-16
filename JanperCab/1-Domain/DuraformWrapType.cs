using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformWrapType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisabledFromDisplay { get; set; }

        public decimal ICB_EDGETHICK { get; set; }


        public virtual ICollection<DuraformWrapColor> DuraformWrapColors { get; set; }

        public virtual ICollection<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }

        public virtual ICollection<DuraformWrapPriceGrid> DuraformWrapPriceGrids { get; set; }

        public virtual ICollection<DuraformEnquiry> DuraformEnquiries { get; set; }

        public virtual ICollection<DuraformMiscPriceLooseFoil> DuraformMiscPriceLooseFoils { get; set; }

        public virtual ICollection<DuraformMiscPriceCapMould> DuraformMiscPriceCapMoulds { get; set; }

        public virtual ICollection<DuraformMiscPriceFingerPull> DuraformMiscPriceFingerPulls { get; set; }

        public DuraformWrapType()
        {
            DuraformWrapColors = new Collection<DuraformWrapColor>();
            NotAvailableDesignWrapTypes = new Collection<NotAvailableDesignWrapType>();
            DuraformWrapPriceGrids = new Collection<DuraformWrapPriceGrid>();
            DuraformEnquiries = new Collection<DuraformEnquiry>();
            DuraformMiscPriceLooseFoils = new Collection<DuraformMiscPriceLooseFoil>();
            DuraformMiscPriceCapMoulds = new Collection<DuraformMiscPriceCapMould>();
            DuraformMiscPriceFingerPulls = new Collection<DuraformMiscPriceFingerPull>();
        }
    }
}