using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<DuraformForm> DuraformForms { get; set; }

        public ApplicationUser()
        {
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}
