using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public enum DuraformOrderType
    {
        Draft = 1,
        Quote = 2,
        Order = 3,
    }

    public abstract class DuraformForm
    {
        public Guid Id { get; set; }

        public DuraformOrderType OrderType { get; set; }

        public string CustomerOrderNumber { get; set; }

        public int DuraformDesignId { get; set; }

        public DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }

        public string CreatedByUserId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastUpdated { get; set; }


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


        public virtual Distributor Distributor { get; set; }

        public virtual CabinetMaker CabinetMaker { get; set; }


        public virtual DuraformDesign DuraformDesign { get; set; }

        public virtual DuraformSerie DuraformSerie { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }

        public virtual DuraformWrapColor DuraformWrapColor { get; set; }

        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }

        public virtual HingeHoleType HingeHoleType { get; set; }

        public virtual DuraformArch DuraformArch { get; set; }

        public virtual ApplicationUser CreatedByUser { get; set; }

        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }



        protected DuraformForm()
        {
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
            DuraformComponents = new Collection<DuraformComponent>();
        }
    }
}