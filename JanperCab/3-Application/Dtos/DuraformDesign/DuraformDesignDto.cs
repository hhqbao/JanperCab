using _3_Application.Dtos.DuraformEdgeProfile;
using _3_Application.Dtos.DuraformSerie;
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.DuraformDesign
{
    public class DuraformDesignDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }

        public int DuraformSerieId { get; set; }

        public int DefaultEdgeProfileId { get; set; }

        public bool HasNoArch { get; set; }

        public decimal Thickness { get; set; }


        public DuraformSerieDto DuraformSerie { get; set; }

        public DuraformEdgeProfileDto DefaultEdgeProfile { get; set; }

        public Collection<DuraformDesignEdgeProfileDto> AllowedEdgeProfiles { set; get; }
    }
}