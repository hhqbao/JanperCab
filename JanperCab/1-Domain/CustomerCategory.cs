using _1_Domain.Enum;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public abstract class CustomerCategory
    {
        public int Id { get; set; }

        public CustomerCategoryType CategoryType { get; set; }


        public virtual ICollection<Customer> Customers { get; set; }

        protected CustomerCategory()
        {
            Customers = new Collection<Customer>();
        }
    }
}