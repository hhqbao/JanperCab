using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class MachineCleaning : Machine
    {
        public virtual ICollection<DuraformProcessCleaning> DuraformProcessCleanings { get; set; }

        public MachineCleaning()
        {
            MachineType = MachineTypeEnum.Cleaning;
        }
    }
}