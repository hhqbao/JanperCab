using _1_Domain.Enum;

namespace _1_Domain
{
    public class ProcessPacking : Process
    {
        public int? MachineId { get; set; }

        public virtual MachinePacking MachinePacking { get; set; }

        public ProcessPacking()
        {
            ProcessType = ProcessTypeEnum.Packing;
        }
    }
}