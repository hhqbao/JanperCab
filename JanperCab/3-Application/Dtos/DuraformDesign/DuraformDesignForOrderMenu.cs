
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.DuraformDesign
{
    public class DuraformDesignForOrderMenu
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }

        public _1_Domain.DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public int DefaultEdgeProfileId { get; set; }

        public bool HasNoArch { get; set; }

        public string DefaultEdgeProfileName { get; set; }

        public decimal Thickness { get; set; }

        public Collection<DuraformDesignEdgeProfileDto> AllowedEdgeProfiles { set; get; }
    }
}