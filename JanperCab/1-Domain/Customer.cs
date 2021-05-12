using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public enum CustomerType
    {
        Manufacturer = 1,
        Distributor = 2,
        CabinetMaker = 3
    }

    public abstract class Customer
    {
        public int Id { get; set; }

        public int? ManagerId { get; set; }

        public CustomerType CustomerType { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Fax { get; set; }

        public string Note { get; set; }

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



        public decimal DiscountRate { get; set; }


        public virtual Customer Manager { get; set; }

        public virtual ICollection<Customer> ManagedCustomers { get; set; }

        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }

        public virtual ICollection<Enquiry> OrderedEnquiries { get; set; }

        public virtual ICollection<Enquiry> ManagedEnquiries { get; set; }

        public virtual ICollection<Invoice> Invoices { get; set; }


        protected Customer()
        {
            ManagedCustomers = new Collection<Customer>();

            ApplicationUsers = new Collection<ApplicationUser>();

            OrderedEnquiries = new Collection<Enquiry>();

            ManagedEnquiries = new Collection<Enquiry>();

            Invoices = new Collection<Invoice>();
        }
    }
}