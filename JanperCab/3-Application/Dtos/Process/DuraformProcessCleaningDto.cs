using _3_Application.Dtos.Machine;

namespace _3_Application.Dtos.Process
{
    public class DuraformProcessCleaningDto : DuraformProcessDto
    {
        public int? MachineId { get; set; }

        public MachineCleaningDto MachineCleaning { set; get; }
    }
}