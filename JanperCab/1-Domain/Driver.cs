using System.Collections.Generic;

namespace _1_Domain
{
    public class Driver
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsDisabled { get; set; }


        public virtual ICollection<DeliveryRunSheet> DeliveryRunSheets { get; set; }
    }
}