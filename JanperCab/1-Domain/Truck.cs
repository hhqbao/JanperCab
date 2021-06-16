using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class Truck
    {
        public int Id { get; set; }

        public string PlateNumber { get; set; }

        public bool IsDisabled { get; set; }

        public virtual ICollection<ShippingSheet> ShippingSheets { get; set; }

        public Truck()
        {
            ShippingSheets = new Collection<ShippingSheet>();
        }
    }
}