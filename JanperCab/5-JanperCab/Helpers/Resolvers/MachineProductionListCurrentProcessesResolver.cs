using _1_Domain;
using _3_Application.Dtos.Machine;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class MachineProductionListCurrentProcessesResolver : IValueResolver<Machine, MachineProductionListDto, List<MachineProdutionCurrentProcessDto>>
    {
        public List<MachineProdutionCurrentProcessDto> Resolve(Machine source, MachineProductionListDto destination,
            List<MachineProdutionCurrentProcessDto> destMember, ResolutionContext context)
        {
            var processes = new List<Process>();

            switch (source)
            {
                case MachineRouter router:
                    processes.AddRange(router.DuraformProcessRoutings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList());
                    break;
                case MachinePresser presser:
                    processes.AddRange(presser.DuraformProcessPressings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList());
                    break;
                case MachineCutter cutter:
                    break;
                case MachineCleaning cleaning:
                    processes.AddRange(cleaning.DuraformProcessCleanings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList());
                    break;
                case MachinePacking packing:
                    processes.AddRange(packing.DuraformProcessPackings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList());
                    break;
                default:
                    throw new NotImplementedException();
            }

            return processes.Select(x => new MachineProdutionCurrentProcessDto(x)).ToList();
        }
    }
}