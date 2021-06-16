using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.Process
{
    public class ProcessCleaningDto : ProcessDto
    {
        public int? MachineId { get; set; }

        public MachineCleaningDto MachineCleaning { set; get; }
    }
}