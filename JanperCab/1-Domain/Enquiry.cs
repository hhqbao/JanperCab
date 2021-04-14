using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public abstract class Enquiry
    {
        public int Id { get; set; }

        public string CustomerReference { get; set; }

        public EnquiryTypeEnum EnquiryType { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CreatorId { get; set; }


        public int DistributorId { get; set; }

        public int CabinetMakerId { get; set; }

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

        public decimal DeliveryFee { get; set; }

        public decimal? TotalPrice { get; set; }

        public bool NotEditable { get; set; }

        public int? DeliveryRunSheetId { get; set; }

        public virtual ApplicationUser Creator { get; set; }

        public virtual Distributor Distributor { get; set; }

        public virtual CabinetMaker CabinetMaker { get; set; }

        public virtual DeliveryRunSheet DeliveryRunSheet { get; set; }


        public abstract string DoorType { get; }

        public abstract string DoorColor { get; }

        public abstract Process CurrentProcess { get; }

        public abstract int PartCount { get; }

        public abstract void ProcessRouting(MachineRouter router);

        public abstract void ProcessPressing(MachinePresser presser);

        public abstract void ProcessCleaning(MachineCleaning cleaningMachine);

        public abstract void ProcessPacking(MachinePacking packingMachine);

        public abstract void ProcessDelivering(DeliveryRunSheet runSheet);

        public abstract void UndoDelivering();

        protected Enquiry()
        {
            EnquiryType = EnquiryTypeEnum.Draft;
            CreatedDate = DateTime.Now;
        }

        public abstract string GetDescription();
    }
}
