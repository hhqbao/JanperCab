using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessRouting : DuraformProcess
    {
        public int? MachineId { get; set; }


        public virtual MachineRouter MachineRouter { get; set; }

        public DuraformProcessRouting()
        {
            DuraformProcessType = DuraformProcessEnum.Routing;
        }
    }
}