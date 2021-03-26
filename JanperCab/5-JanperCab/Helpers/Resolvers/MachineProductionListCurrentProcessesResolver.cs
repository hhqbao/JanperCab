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
            var machines = new List<MachineProdutionCurrentProcessDto>();

            switch (source)
            {
                case MachineRouter router:
                    var currentRoutingProcess = router.DuraformProcessRoutings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList();

                    machines.AddRange(currentRoutingProcess.Select(x => new MachineProdutionCurrentProcessDto(x)));
                    break;
                case MachinePresser presser:
                    var currentPressingProcess = presser.DuraformProcessPressings.Where(x => x.IsCurrent && !x.EndTime.HasValue).ToList();

                    machines.AddRange(currentPressingProcess.Select(x => new MachineProdutionCurrentProcessDto(x)));
                    break;
                case MachineCutter cutter:
                    return null;
                default:
                    throw new NotImplementedException();
            }

            return machines;
        }
    }
}