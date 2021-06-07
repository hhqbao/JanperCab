using System.Collections.ObjectModel;

namespace _3_Application.Dtos.DuraformDesign
{
    public class DuraformDesignForOrderMenu : DuraformDesignDto
    {
        public string DefaultEdgeProfileName { get; set; }

        public Collection<DuraformDesignEdgeProfileDto> AllowedEdgeProfiles { set; get; }
    }
}