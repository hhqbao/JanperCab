using System.Collections.Generic;
using _3_Application.Dtos.Process;

namespace _3_Application.Dtos.Machine
{
    public class MachinePackingDto : MachineDto
    {
        public ICollection<ProcessPackingDto> DuraformProcessPackings { set; get; }
    }
}