using _1_Domain.Enum;

namespace _1_Domain
{
    public abstract class Machine
    {
        public int Id { get; set; }

        public MachineTypeEnum MachineType { get; set; }

        public string Name { get; set; }
    }
}