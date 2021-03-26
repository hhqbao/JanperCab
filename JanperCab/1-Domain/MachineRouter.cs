using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class MachineRouter : Machine
    {
        public virtual ICollection<DuraformProcessRouting> DuraformProcessRoutings { get; set; }

        public MachineRouter()
        {
            MachineType = MachineTypeEnum.Router;
        }
    }
}