using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public class MachineRouter : Machine
    {
        public virtual ICollection<ProcessRouting> DuraformProcessRoutings { get; set; }

        public MachineRouter()
        {
            MachineType = MachineTypeEnum.Router;
        }
    }
}