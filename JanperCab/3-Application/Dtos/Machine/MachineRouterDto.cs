using _3_Application.Dtos.Process;
using System.Collections.Generic;

namespace _3_Application.Dtos.Machine
{
    public class MachineRouterDto : MachineDto
    {
        public ICollection<ProcessRoutingDto> DuraformProcessRoutings { get; set; }
    }
}