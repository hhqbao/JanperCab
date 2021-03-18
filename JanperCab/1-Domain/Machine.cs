using System.Collections.Generic;

namespace _1_Domain
{
    public class Machine
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<DuraformProcessRouting> DuraformProcessRoutings { get; set; }
    }
}