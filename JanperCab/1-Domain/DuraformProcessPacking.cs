using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessPacking : DuraformProcess
    {
        public int? MachineId { get; set; }

        public virtual MachinePacking MachinePacking { get; set; }

        public DuraformProcessPacking()
        {
            DuraformProcessType = DuraformProcessEnum.Packing;
        }
    }
}