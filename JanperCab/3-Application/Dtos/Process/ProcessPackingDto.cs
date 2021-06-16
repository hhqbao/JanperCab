using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.Process
{
    public class ProcessPackingDto : ProcessDto
    {
        public int? MachineId { get; set; }

        public MachinePackingDto MachinePacking { set; get; }
    }
}