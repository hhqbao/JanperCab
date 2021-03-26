using _1_Domain.Enum;

namespace _3_Application.Dtos.Machine
{
    public abstract class MachineDto
    {
        public int Id { get; set; }

        public MachineTypeEnum MachineType { get; set; }

        public string Name { get; set; }
    }
}