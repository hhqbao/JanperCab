using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Distributor : Customer
    {
        public string Address { get; set; }

        public string Suburb { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public string ContactPerson { get; set; }



        public virtual ICollection<CabinetMaker> CabinetMakers { get; set; }

        public virtual ICollection<Enquiry> Enquiries { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }

        public Distributor()
        {
            CustomerType = CustomerType.Distributor;

            CabinetMakers = new Collection<CabinetMaker>();

            Enquiries = new Collection<Enquiry>();

            Invoices = new Collection<Invoice>();
        }
    }
}