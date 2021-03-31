using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessCleaning : DuraformProcess
    {
        public int? MachineId { get; set; }

        public virtual MachineCleaning MachineCleaning { get; set; }

        public DuraformProcessCleaning()
        {
            DuraformProcessType = DuraformProcessEnum.Cleaning;
        }
    }
}