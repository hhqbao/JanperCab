using _3_Application.Dtos.Process;
using System.Collections.Generic;

namespace _3_Application.Dtos.Machine
{
    public class MachinePresserDto : MachineDto
    {
        public ICollection<DuraformProcessPressingDto> DuraformProcessPressings { get; set; }
    }
}