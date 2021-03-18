using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.DuraformProcess
{
    public class DuraformProcessRoutingDto : DuraformProcessDto
    {
        public int MachineId { get; set; }

        public MachineDto Machine { set; get; }
    }
}