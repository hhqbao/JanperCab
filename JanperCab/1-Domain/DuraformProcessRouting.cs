using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessRouting : DuraformProcess
    {
        public int? MachineId { get; set; }


        public virtual Machine Machine { get; set; }

        public DuraformProcessRouting()
        {
            Process = DuraformProcessEnum.Routing;
        }
    }
}