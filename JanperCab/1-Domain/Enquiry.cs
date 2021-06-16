﻿using _1_Domain.Enum;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

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


        public Process CurrentProcess => Processes.FirstOrDefault(x => x.IsCurrent);

        public DateTime? DeliveredTime => Processes.OfType<ProcessDelivering>().FirstOrDefault()?.EndTime;

        public string FullDeliveryAddress => $"{DeliveryAddress}, {DeliverySuburb} {DeliveryState} {DeliveryPostcode}";

        public string FullInvoiceAddress => $"{InvoiceAddress}, {InvoiceSuburb} {InvoiceState} {InvoicePostcode}";

        public bool HasBeenDelivered => DeliveredTime.HasValue;

        public bool HasBeenInvoiced => Invoice != null;


        public abstract string JobType { get; }

        public abstract string DoorType { get; }

        public abstract string DoorColor { get; }

        public abstract bool IsDeclineable { get; }

        public abstract int PartCount { get; }



        public abstract List<InvoiceComponent> GenerateComponentsForInvoice();

        public abstract void Approve();

        public abstract void Decline();

        public abstract void ProcessRouting(MachineRouter router);

        public abstract void ProcessPressing(MachinePresser presser);

        public abstract void StartCleaning(MachineCleaning cleaningMachine);

        public abstract void FinishCleaning();

        public abstract void StartPacking(MachinePacking packingMachine);

        public abstract void FinishPacking();

        public abstract void ProcessDelivering(DeliverySheet sheet);

        public abstract void UndoDelivering();

        public abstract void CompleteDelivering();


        public virtual ApplicationUser Creator { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Customer Manager { get; set; }

        public virtual ICollection<Process> Processes { get; set; }

        public virtual Invoice Invoice { get; set; }


        protected Enquiry()
        {
            EnquiryType = EnquiryTypeEnum.Draft;
            CreatedDate = DateTime.Now;
            Processes = new Collection<Process>();
        }

        public abstract string GetDescription();

        public void RemoveDeliveryFee()
        {
            SubTotal -= DeliveryFee;
            DeliveryFee = 0;

            TotalGst = Math.Round(SubTotal / 10, 2);
            TotalPrice = SubTotal + TotalGst;
        }
    }
}
