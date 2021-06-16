using _1_Domain.Enum;

namespace _1_Domain
{
    public class ProcessRouting : Process
    {
        public int? MachineId { get; set; }


        public virtual MachineRouter MachineRouter { get; set; }

        public ProcessRouting()
        {
            ProcessType = ProcessTypeEnum.Routing;
        }
    }
}