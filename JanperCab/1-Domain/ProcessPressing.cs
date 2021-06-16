using _1_Domain.Enum;

namespace _1_Domain
{
    public class ProcessPressing : Process
    {
        public int? MachineId { get; set; }

        public virtual MachinePresser MachinePresser { get; set; }

        public ProcessPressing()
        {
            ProcessType = ProcessTypeEnum.Pressing;
        }
    }
}