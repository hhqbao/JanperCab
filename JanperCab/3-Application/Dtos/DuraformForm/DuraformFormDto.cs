using _1_Domain;
using _3_Application.Dtos.DuraformComponent;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.DuraformForm
{
    public abstract class DuraformFormDto
    {
        public Guid Id { get; set; }

        public DuraformOrderType OrderType { get; set; }

        [Required]
        public string CustomerOrderNumber { get; set; }

        public int DuraformDesignId { get; set; }

        public _1_Domain.DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }

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

        public bool NotEditable { get; set; }

        public decimal? TotalPrice { get; set; }


        public ICollection<DuraformComponentDto> DuraformComponents { get; set; }

        protected DuraformFormDto()
        {
            DuraformComponents = new Collection<DuraformComponentDto>();
        }
    }
}