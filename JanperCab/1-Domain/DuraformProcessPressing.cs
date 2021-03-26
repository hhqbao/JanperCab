using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessPressing : DuraformProcess
    {
        public int? MachineId { get; set; }

        public virtual MachinePresser MachinePresser { get; set; }

        public DuraformProcessPressing()
        {
            DuraformProcessType = DuraformProcessEnum.Pressing;
        }
    }
}