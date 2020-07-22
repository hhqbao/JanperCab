using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class ApplicationUser : IdentityUser
    {
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public ApplicationUser()
        {
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}
