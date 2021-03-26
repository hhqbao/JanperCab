using _3_Application.Dtos.Process;
using System.Collections.Generic;

namespace _3_Application.Dtos.Machine
{
    public class MachineRouterDto : MachineDto
    {
        public ICollection<DuraformProcessRoutingDto> DuraformProcessRoutings { get; set; }
    }
}