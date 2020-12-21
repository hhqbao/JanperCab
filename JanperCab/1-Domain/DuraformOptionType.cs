using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformOptionType
    {
        public DuraformOptionTypeKey Id { get; set; }

        public string Name { get; set; }


        public virtual ICollection<DuraformOption> DuraformOptions { get; set; }
    }
}