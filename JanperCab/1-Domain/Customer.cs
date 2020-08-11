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

        public CustomerType CustomerType { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }




        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }

        protected Customer()
        {
            ApplicationUsers = new Collection<ApplicationUser>();
        }
    }
}