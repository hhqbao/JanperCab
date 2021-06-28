using _1_Domain.Enum;
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

        public DuraformEnquiry()
        {
            DuraformComponents = new Collection<DuraformComponent>();
            MiscComponents = new Collection<DuraformMiscComponent>();
            DuraformFiles = new Collection<DuraformFile>();
        }

        public override string JobType => IsRoutingOnly ? ICBLineStructure.DSW : "DF";

        public override string DoorType => DuraformDesign.Name;

        public override string DoorColor => IsRoutingOnly ? ICBLineStructure.DSW : $"{DuraformWrapType.Name} {DuraformWrapColor.Name}";

        public override bool IsDeclineable => !HasBeenInvoiced && (CurrentProcess == null || CurrentProcess is ProcessPreRoute);

        public override int PartCount
        {
            get { return DuraformComponents.Sum(x => x.Quantity) + MiscComponents.Sum(x => x.Quantity); }
        }

        public override List<InvoiceComponent> GenerateComponentsForInvoice()
        {
            var components = DuraformComponents.Select(component => new InvoiceComponent(component)).ToList();
            components.AddRange(MiscComponents.Select(miscItem => new InvoiceComponent(miscItem)));

            return components;
        }

        public override void Approve()
        {
            ApprovedDate = DateTime.Now;
            Processes.Clear();

            Processes.Add(new ProcessPreRoute { StartTime = DateTime.Now, IsCurrent = true });
            Processes.Add(new ProcessRouting());

            if (IsRoutingOnly)
            {
                Processes.Add(new ProcessPacking());
            }
            else
            {
                Processes.Add(new ProcessPressing());
                Processes.Add(new ProcessCleaning());
                Processes.Add(new ProcessPacking());
            }

            Processes.Add(new ProcessDelivering());
        }

        public override void Decline()
        {
            EnquiryType = EnquiryTypeEnum.Draft;
            OrderedDate = null;
            ApprovedDate = null;
            Processes.Clear();
            NotEditable = false;
        }

        public override void ProcessRouting(MachineRouter router)
        {
            var routingProcess = Processes
                .OfType<ProcessRouting>()
                .FirstOrDefault();

            if (routingProcess == null)
                throw new Exception("Order not for ROUTING");

            switch (CurrentProcess)
            {
                case ProcessPreRoute preRoute:
                    if (!preRoute.EndTime.HasValue)
                        preRoute.EndTime = DateTime.Now;

                    preRoute.IsCurrent = false;

                    routingProcess.StartTime = DateTime.Now;
                    routingProcess.MachineId = router.Id;
                    routingProcess.IsCurrent = true;
                    break;
                case ProcessRouting routing:
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
            var pressingProcess = Processes
                .OfType<ProcessPressing>()
                .FirstOrDefault();

            if (pressingProcess == null)
                throw new Exception("Order not for PRESSING");

            switch (CurrentProcess)
            {
                case ProcessRouting routing:
                    if (!routing.EndTime.HasValue)
                        throw new Exception($"Order is currently being routed on Router {routing.MachineRouter.Name}");

                    routing.IsCurrent = false;

                    pressingProcess.StartTime = DateTime.Now;
                    pressingProcess.MachineId = presser.Id;
                    pressingProcess.IsCurrent = true;
                    break;
                case ProcessPressing pressing:
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

        public override void StartCleaning(MachineCleaning cleaningMachine)
        {
            var cleanProcess = Processes
                .OfType<ProcessCleaning>()
                .FirstOrDefault();

            if (cleanProcess == null)
                throw new Exception("Order not for CLEANING");

            switch (CurrentProcess)
            {
                case ProcessPressing pressing:
                    if (!pressing.EndTime.HasValue)
                        throw new Exception($"Order is currently being pressed on Presser {pressing.MachinePresser.Name}");

                    pressing.IsCurrent = false;

                    cleanProcess.StartTime = DateTime.Now;
                    cleanProcess.MachineId = cleaningMachine.Id;
                    cleanProcess.IsCurrent = true;
                    break;
                case ProcessCleaning cleaning:
                    if (cleaning.EndTime.HasValue)
                        throw new Exception("Order has already been CLEANED");
                    break;
                default:
                    throw new Exception("Order not valid for CLEANING");
            }
        }

        public override void FinishCleaning()
        {
            switch (CurrentProcess)
            {
                case ProcessCleaning cleaning:
                    if (cleaning.EndTime.HasValue)
                        throw new Exception("Order has already been CLEANED");

                    cleaning.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for CLEANING");
            }
        }

        public override void StartPacking(MachinePacking packingMachine)
        {
            var packingProcess = Processes
                .OfType<ProcessPacking>()
                .FirstOrDefault();

            if (packingProcess == null)
                throw new Exception("Order not for PACKING");

            switch (CurrentProcess)
            {
                case ProcessRouting routing:
                    if (!routing.EndTime.HasValue)
                        throw new Exception($"Order is currently being routed on Router {routing.MachineRouter.Name}");

                    if (!IsRoutingOnly)
                        throw new Exception("Order needs to be PRESSED and CLEANED before packing");

                    routing.IsCurrent = false;

                    packingProcess.StartTime = DateTime.Now;
                    packingProcess.MachineId = packingMachine.Id;
                    packingProcess.IsCurrent = true;
                    break;
                case ProcessCleaning cleaning:
                    if (!cleaning.EndTime.HasValue)
                        throw new Exception($"Order is currently being cleaned on Cleaning Machine {cleaning.MachineCleaning.Name}");

                    cleaning.IsCurrent = false;

                    packingProcess.StartTime = DateTime.Now;
                    packingProcess.MachineId = packingMachine.Id;
                    packingProcess.IsCurrent = true;
                    break;
                case ProcessPacking packing:
                    if (packing.EndTime.HasValue)
                        throw new Exception("Order has already been PACKED");
                    break;
                default:
                    throw new Exception("Order not valid for PACKING");
            }
        }

        public override void FinishPacking()
        {
            switch (CurrentProcess)
            {
                case ProcessPacking packing:
                    if (packing.EndTime.HasValue)
                        throw new Exception("Order has already been PACKED");

                    packing.EndTime = DateTime.Now;
                    break;
                default:
                    throw new Exception("Order not valid for PACKING");
            }
        }

        public override void ProcessDelivering(DeliverySheet sheet)
        {
            switch (CurrentProcess)
            {
                case ProcessPacking packing:
                    if (!packing.EndTime.HasValue)
                        throw new Exception($"Order currently being PACKED on Packing Machine {packing.MachinePacking.Name}");

                    packing.IsCurrent = false;

                    var deliveringProcess = Processes.OfType<ProcessDelivering>().First();
                    deliveringProcess.DeliverySheetId = sheet.Id;
                    deliveringProcess.StartTime = DateTime.Now;
                    deliveringProcess.IsCurrent = true;
                    break;
                default:
                    throw new Exception("Order needs to be at PACKED stage to be DISPATCHED");
            }
        }

        public override void UndoDelivering()
        {
            var deliveringProcess = Processes.OfType<ProcessDelivering>().First();

            if (!deliveringProcess.DeliverySheetId.HasValue)
                throw new Exception("Order Not Being Delivered");

            if (!deliveringProcess.DeliverySheet.IsEditable)
                throw new Exception("Delivery Sheet is LOCKED! Cannot Edit");

            deliveringProcess.IsCurrent = false;
            deliveringProcess.DeliverySheetId = null;
            deliveringProcess.StartTime = null;
            deliveringProcess.EndTime = null;


            var packingProcess = Processes.OfType<ProcessPacking>().First();
            packingProcess.IsCurrent = true;
        }

        public override void CompleteDelivering()
        {
            if (!(CurrentProcess is ProcessDelivering deliveringProcess))
                throw new Exception($"Order [{Id:000000}] Not At Delivering Stage");

            if (deliveringProcess.EndTime.HasValue)
                throw new Exception($"Order [{Id:000000}] was already delivered on {deliveringProcess.EndTime.Value:dd/MM/yyyy hh:mm}");

            deliveringProcess.EndTime = DateTime.Now;
        }

        public override string GetDescription()
        {
            var type = IsRoutingOnly ? ICBLineStructure.DSW : "DF";
            var numberOfPieces = DuraformComponents.Sum(x => x.Quantity);

            return $"{type} - {Customer.Name} | {numberOfPieces} parts";
        }
    }
}