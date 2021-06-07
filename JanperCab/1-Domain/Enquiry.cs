using _1_Domain.Enum;
using System;
using System.Collections.Generic;

namespace _1_Domain
{
    public abstract class Enquiry
    {
        public int Id { get; set; }

        public int CustomerId { set; get; }

        public int? ManagerId { get; set; }

        public string CustomerReference { get; set; }

        public EnquiryTypeEnum EnquiryType { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CreatorId { get; set; }


        public string InvoiceTo { get; set; }

        public string InvoiceAddress { get; set; }

        public string InvoiceSuburb { get; set; }

        public string InvoiceState { get; set; }

        public string InvoicePostcode { get; set; }

        public string DeliveryTo { get; set; }

        public string DeliveryAddress { get; set; }

        public string DeliverySuburb { get; set; }

        public string DeliveryState { get; set; }

        public string DeliveryPostcode { get; set; }

        public string DeliveryNote { get; set; }

        public decimal GstRate { get; set; }

        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public decimal SubTotal { get; set; }

        public decimal TotalGst { get; set; }

        public decimal? TotalPrice { get; set; }

        public bool NotEditable { get; set; }


        public int? DeliveryRunSheetId { get; set; }

        public int? PickUpSheetId { get; set; }


        public virtual ApplicationUser Creator { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Customer Manager { get; set; }

        public virtual DeliveryRunSheet DeliveryRunSheet { get; set; }

        public virtual PickUpSheet PickUpSheet { get; set; }

        public virtual Invoice Invoice { get; set; }


        public abstract string JobType { get; }

        public abstract string DoorType { get; }

        public abstract string DoorColor { get; }

        public abstract Process CurrentProcess { get; }

        public abstract bool IsDeclineable { get; }

        public abstract int PartCount { get; }

        public abstract bool HasBeenDelivered { get; }

        public abstract DateTime? DeliveredTime { get; }



        public string FullDeliveryAddress => $"{DeliveryAddress}, {DeliverySuburb} {DeliveryState} {DeliveryPostcode}";

        public string FullInvoiceAddress => $"{InvoiceAddress}, {InvoiceSuburb} {InvoiceState} {InvoicePostcode}";

        public bool HasBeenInvoiced => Invoice != null;


        public abstract List<InvoiceComponent> GenerateComponentsForInvoice();

        public abstract void Approve();

        public abstract void Decline();

        public abstract void ProcessRouting(MachineRouter router);

        public abstract void ProcessPressing(MachinePresser presser);

        public abstract void StartCleaning(MachineCleaning cleaningMachine);

        public abstract void FinishCleaning();

        public abstract void StartPacking(MachinePacking packingMachine);

        public abstract void FinishPacking();

        public abstract void ProcessDelivering(DeliveryRunSheet runSheet);

        public abstract void ProcessPickUp(PickUpSheet pickUpSheet);

        public abstract void UndoDelivering();

        public abstract void UndoPickUp();

        public abstract void CompleteDelivering();

        public abstract void CompletePickingUp();


        protected Enquiry()
        {
            EnquiryType = EnquiryTypeEnum.Draft;
            CreatedDate = DateTime.Now;
        }

        public abstract string GetDescription();
    }
}
