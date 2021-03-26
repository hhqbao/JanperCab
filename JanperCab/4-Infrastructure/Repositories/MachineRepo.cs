using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace _4_Infrastructure.Repositories
{
    public class MachineRepo : BaseRepository<Machine>, IMachineRepo
    {
        public MachineRepo(DbContext dbContext) : base(dbContext)
        {
        }

        public DuraformProcessRouting ProcessRouting(MachineRouter router, DuraformEnquiry duraformEnquiry)
        {
            var currentStatus = duraformEnquiry.DuraformProcesses.FirstOrDefault(x => x.IsCurrent);


            switch (currentStatus)
            {
                case DuraformProcessPreRoute preRoute:
                    if (!preRoute.EndTime.HasValue)
                        preRoute.EndTime = DateTime.Now;

                    preRoute.IsCurrent = false;

                    var routingProcess = duraformEnquiry.DuraformProcesses
                        .OfType<DuraformProcessRouting>()
                        .First();

                    routingProcess.StartTime = DateTime.Now;
                    routingProcess.MachineId = router.Id;
                    routingProcess.IsCurrent = true;
                    return routingProcess;
                case DuraformProcessRouting routing:
                    if (routing.EndTime.HasValue)
                        throw new Exception("Order has already been ROUTED");

                    if (routing.MachineId != router.Id)
                        throw new Exception($"Order is currently on Router {routing.MachineRouter.Name}");

                    routing.EndTime = DateTime.Now;
                    return routing;
                default:
                    throw new Exception("Order not valid for ROUTING");
            }
        }

        public DuraformProcessPressing ProcessPressing(MachinePresser presser, DuraformEnquiry duraformEnquiry)
        {
            var currentStatus = duraformEnquiry.DuraformProcesses.FirstOrDefault(x => x.IsCurrent);

            switch (currentStatus)
            {
                case DuraformProcessRouting routing:
                    if (!routing.EndTime.HasValue)
                        throw new Exception($"Order is currently being routed on Router {routing.MachineRouter.Name}");

                    routing.IsCurrent = false;

                    var pressingProcess = duraformEnquiry.DuraformProcesses
                        .OfType<DuraformProcessPressing>()
                        .First();

                    pressingProcess.StartTime = DateTime.Now;
                    pressingProcess.MachineId = presser.Id;
                    pressingProcess.IsCurrent = true;

                    return pressingProcess;
                case DuraformProcessPressing pressing:
                    if (pressing.EndTime.HasValue)
                        throw new Exception("Order has already been PRESSED");

                    if (pressing.MachineId != presser.Id)
                        throw new Exception($"Order is currently on Presser {pressing.MachinePresser.Name}");

                    pressing.EndTime = DateTime.Now;
                    return pressing;
                default:
                    throw new Exception("Order not valid for ROUTING");
            }
        }
    }
}