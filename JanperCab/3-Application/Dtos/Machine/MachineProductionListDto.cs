using _1_Domain.Enum;
using System.Collections.Generic;

namespace _3_Application.Dtos.Machine
{
    public class MachineProductionListDto
    {
        public int Id { get; set; }

        public MachineTypeEnum MachineType { get; set; }

        public string Name { get; set; }

        public List<MachineProdutionCurrentProcessDto> CurrentProcesses { get; set; }
    }
}