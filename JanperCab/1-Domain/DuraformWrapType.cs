using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformWrapType
    {
        public int Id { get; set; }

        public string Name { get; set; }


        public virtual ICollection<DuraformWrapColor> DuraformWrapColors { get; set; }

        public virtual ICollection<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }

        public ICollection<DuraformForm> DuraformForms { get; set; }

        public DuraformWrapType()
        {
            DuraformWrapColors = new Collection<DuraformWrapColor>();
            NotAvailableDesignWrapTypes = new Collection<NotAvailableDesignWrapType>();
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}