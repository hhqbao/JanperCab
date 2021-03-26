using _1_Domain.Enum;

namespace _1_Domain
{
    public class MachineCutter : Machine
    {
        public MachineCutter()
        {
            MachineType = MachineTypeEnum.Cutter;
        }
    }
}