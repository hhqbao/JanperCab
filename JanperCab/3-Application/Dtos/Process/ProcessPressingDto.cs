using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.Process
{
    public class ProcessPressingDto : ProcessDto
    {
        public int? MachineId { get; set; }

        public MachinePresserDto MachinePresser { get; set; }
    }
}