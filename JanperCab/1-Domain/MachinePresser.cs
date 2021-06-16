using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class MachinePresser : Machine
    {
        public virtual ICollection<ProcessPressing> DuraformProcessPressings { get; set; }

        public MachinePresser()
        {
            MachineType = MachineTypeEnum.Presser;
        }
    }
}