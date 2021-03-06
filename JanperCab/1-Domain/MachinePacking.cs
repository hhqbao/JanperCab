﻿using System.Collections.Generic;
using _1_Domain.Enum;

namespace _1_Domain
{
    public class MachinePacking : Machine
    {
        public virtual ICollection<ProcessPacking> DuraformProcessPackings { get; set; }

        public MachinePacking()
        {
            MachineType = MachineTypeEnum.Packing;
        }
    }
}