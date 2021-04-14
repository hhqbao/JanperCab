using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace _1_Domain
{
    public class DuraformEnquiry : Enquiry
    {
        public int DuraformDesignId { get; set; }

        public int DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }


        public virtual DuraformDesign DuraformDesign { get; set; }

        public virtual DuraformSerie DuraformSerie { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }

        public virtual DuraformWrapColor DuraformWrapColor { get; set; }

        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }

        public virtual HingeHoleType HingeHoleType { get; set; }

        public virtual DuraformArch DuraformArch { get; set; }



        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }

        public virtual ICollection<DuraformMiscComponent> MiscComponents { get; set; }

        public virtual ICollection<DuraformFile> DuraformFiles { get; set; }

        public virtual ICollection<DuraformProcess> DuraformProcesses { get; set; }

        public DuraformEnquiry()
        {
            DuraformComponents = new Collection<DuraformComponent>();
            MiscComponents = new Collection<DuraformMiscComponent>();
            DuraformFiles = new Collection<DuraformFile>();
            DuraformProcesses = new Collection<DuraformProcess>();
        }

        public override string DoorType => DuraformDesign.Name;

        public override string DoorColor => IsRoutingOnly ? "DSW" : $"{DuraformWrapType.Name} {DuraformWrapColor.Name}";

        public override Process CurrentProcess
        {
            get { return DuraformProcesses.FirstOrDefault(x => x.IsCurrent); }
        }

        public override int PartCount
        {
            get { return DuraformComponents.Sum(x => x.Quantity); }
        }

        public override void ProcessRouting(MachineRouter router)
        {
            var routingProcess = DuraformProcesses
                .OfType<DuraformProcessRouting>()
                .FirstOrDefault();

            if (routingProcess == null)
                throw new Exception("Order not for ROUTING");

            switch (CurrentProcess)
            {
                case DuraformProcessPreRoute preRoute:
                    if (!preRoute.EndTime.HasValue)
                        preRoute.EndTime = DateTime.Now;

                    preRoute.IsCurrent = false;

                    routingProcess.StartTime = DateTime.Now;
                    routingProcess.MachineId = router.Id;
                    routingProcess.IsCurrent = true;
                    break;
                case DuraformProcessRouting routing:
                    if (routing.EndTime.HasValue)
                        throw new Exception("Order has already been ROUTED");

                    if (routing.MachineId != router.Id)
                        throw new Exception($"Order is currently on Router {routing.MachineRouter.Name}");

                    routing.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for ROUTING");
            }
        }

        public override void ProcessPressing(MachinePresser presser)
        {
            var pressingProcess = DuraformProcesses
                .OfType<DuraformProcessPressing>()
                .FirstOrDefault();

            if (pressingProcess == null)
                throw new Exception("Order not for PRESSING");

            switch (CurrentProcess)
            {
                case DuraformProcessRouting routing:
                    if (!routing.EndTime.HasValue)
                        throw new Exception($"Order is currently being routed on Router {routing.MachineRouter.Name}");

                    routing.IsCurrent = false;

                    pressingProcess.StartTime = DateTime.Now;
                    pressingProcess.MachineId = presser.Id;
                    pressingProcess.IsCurrent = true;
                    break;
                case DuraformProcessPressing pressing:
                    if (pressing.EndTime.HasValue)
                        throw new Exception("Order has already been PRESSED");

                    if (pressing.MachineId != presser.Id)
                        throw new Exception($"Order is currently on Presser {pressing.MachinePresser.Name}");

                    pressing.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for PRESSING");
            }
        }

        public override void ProcessCleaning(MachineCleaning cleaningMachine)
        {
            var cleanProcess = DuraformProcesses
                .OfType<DuraformProcessCleaning>()
                .FirstOrDefault();

            if (cleanProcess == null)
                throw new Exception("Order not for CLEANING");

            switch (CurrentProcess)
            {
                case DuraformProcessPressing pressing:
                    if (!pressing.EndTime.HasValue)
                        throw new Exception($"Order is currently being pressed on Presser {pressing.MachinePresser.Name}");

                    pressing.IsCurrent = false;

                    cleanProcess.StartTime = DateTime.Now;
                    cleanProcess.MachineId = cleaningMachine.Id;
                    cleanProcess.IsCurrent = true;
                    break;
                case DuraformProcessCleaning cleaning:
                    if (cleaning.EndTime.HasValue)
                        throw new Exception("Order has already been CLEANED");

                    if (cleaning.MachineId != cleaningMachine.Id)
                        throw new Exception($"Order is currently on Cleaning Machine {cleaning.MachineCleaning.Name}");

                    cleaning.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for CLEANING");
            }
        }

        public override void ProcessPacking(MachinePacking packingMachine)
        {
            var packingProcess = DuraformProcesses
                .OfType<DuraformProcessPacking>()
                .FirstOrDefault();

            if (packingProcess == null)
                throw new Exception("Order not for PACKING");

            switch (CurrentProcess)
            {
                case DuraformProcessRouting routing:
                    if (!routing.EndTime.HasValue)
                        throw new Exception($"Order is currently being routed on Router {routing.MachineRouter.Name}");

                    if (!IsRoutingOnly)
                        throw new Exception("Order needs to be PRESSED and CLEANED before packing");

                    routing.IsCurrent = false;

                    packingProcess.StartTime = DateTime.Now;
                    packingProcess.MachineId = packingMachine.Id;
                    packingProcess.IsCurrent = true;
                    break;
                case DuraformProcessCleaning cleaning:
                    if (!cleaning.EndTime.HasValue)
                        throw new Exception($"Order is currently being cleaned on Cleaning Machine {cleaning.MachineCleaning.Name}");

                    cleaning.IsCurrent = false;

                    packingProcess.StartTime = DateTime.Now;
                    packingProcess.MachineId = packingMachine.Id;
                    packingProcess.IsCurrent = true;
                    break;
                case DuraformProcessPacking packing:
                    if (packing.EndTime.HasValue)
                        throw new Exception("Order has already been PACKED");

                    if (packing.MachineId != packingMachine.Id)
                        throw new Exception($"Order is currently on Packing Machine {packing.MachinePacking.Name}");

                    packing.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for PACKING");
            }
        }

        public override void ProcessDelivering(DeliveryRunSheet runSheet)
        {
            switch (CurrentProcess)
            {
                case DuraformProcessPacking packing:
                    if (!packing.EndTime.HasValue)
                        throw new Exception($"Order currently being PACKED on Packing Machine {packing.MachinePacking.Name}");

                    packing.IsCurrent = false;

                    var deliveringProcess = DuraformProcesses.OfType<DuraformProcessDelivering>().First();
                    deliveringProcess.StartTime = DateTime.Now;
                    deliveringProcess.IsCurrent = true;

                    DeliveryRunSheetId = runSheet.Id;

                    if (!runSheet.Enquiries.Any(x => x.CabinetMakerId == CabinetMakerId &&
                                                     x.DeliveryAddress.Equals(DeliveryAddress) &&
                                                     x.DeliverySuburb.Equals(DeliverySuburb) &&
                                                     x.DeliveryState.Equals(DeliveryState) &&
                                                     x.DeliveryPostcode.Equals(DeliveryPostcode) &&
                                                     x.DeliveryFee > 0))
                        DeliveryFee = 0;
                    break;
                default:
                    throw new Exception("Order needs to be at PACKED stage to be DISPATCHED");
            }
        }

        public override void UndoDelivering()
        {
            DeliveryRunSheetId = null;

            var packingProcess = DuraformProcesses.OfType<DuraformProcessPacking>().First();
            var deliveryProvess = DuraformProcesses.OfType<DuraformProcessDelivering>().First();

            deliveryProvess.IsCurrent = false;
            deliveryProvess.StartTime = null;
            deliveryProvess.EndTime = null;

            packingProcess.IsCurrent = true;

            DeliveryFee = 30;
        }

        public override string GetDescription()
        {
            var type = IsRoutingOnly ? "DSW" : "DF";
            var numberOfPieces = DuraformComponents.Sum(x => x.Quantity);

            return $"{type} - {CabinetMaker.Name} | {numberOfPieces} parts | ${TotalPrice}";
        }
    }
}