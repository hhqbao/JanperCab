using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.Process
{
    public class ProcessRoutingDto : ProcessDto
    {
        public int? MachineId { get; set; }

        public MachineDto MachineRouter { set; get; }
    }
}