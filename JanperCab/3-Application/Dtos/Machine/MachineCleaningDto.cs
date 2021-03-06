﻿using System.Collections.Generic;
using _3_Application.Dtos.Process;

namespace _3_Application.Dtos.Machine
{
    public class MachineCleaningDto : MachineDto
    {
        public ICollection<ProcessCleaningDto> DuraformProcessCleanings { set; get; }
    }
}