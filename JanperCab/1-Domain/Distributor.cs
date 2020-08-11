using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Distributor : Customer
    {
        public virtual ICollection<CabinetMaker> CabinetMakers { get; set; }
        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public Distributor()
        {
            CustomerType = CustomerType.Distributor;
            CabinetMakers = new Collection<CabinetMaker>();
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}