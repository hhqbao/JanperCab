using _1_Domain;
using _3_Application.Dtos.DuraformComponent;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.DuraformOrder
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


        public ICollection<DuraformDoorDto> DuraformDoors { get; set; }
    }
}