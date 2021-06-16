using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Driver
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsDisabled { get; set; }

        public virtual ICollection<ShippingSheet> ShippingSheets { get; set; }

        public Driver()
        {
            ShippingSheets = new Collection<ShippingSheet>();
        }
    }
}