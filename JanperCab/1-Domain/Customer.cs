using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Customer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string InvoiceTo { get; set; }

        public string InvoiceAddress { get; set; }

        public string InvoiceSuburb { get; set; }

        public string InvoiceState { get; set; }

        public string InvoicePostcode { get; set; }

        public string DeliveryTo { get; set; }

        public string DeliveryAddress { get; set; }

        public string DeliverySuburb { get; set; }

        public string DeliveryState { get; set; }

        public string DeliveryPostcode { get; set; }


        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }

        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public Customer()
        {
            ApplicationUsers = new Collection<ApplicationUser>();
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}