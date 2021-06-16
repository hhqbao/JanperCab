using _1_Domain.Enum;

namespace _1_Domain
{
    public class ProcessCleaning : Process
    {
        public int? MachineId { get; set; }

        public virtual MachineCleaning MachineCleaning { get; set; }

        public ProcessCleaning()
        {
            ProcessType = ProcessTypeEnum.Cleaning;
        }
    }
}