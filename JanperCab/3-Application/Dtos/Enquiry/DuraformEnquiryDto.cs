using _3_Application.Dtos.ApplicationFile;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.DuraformMiscComponent;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.Enquiry
{
    public class DuraformEnquiryDto : EnquiryDto
    {
        public int DuraformDesignId { get; set; }

        public int DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }


        public ICollection<DuraformComponentDto> DuraformComponents { get; set; }

        public ICollection<DuraformMiscComponentDto> MiscComponents { get; set; }

        public ICollection<DuraformFileDto> DuraformFiles { get; set; }

        public ICollection<DuraformProcessDto> DuraformProcesses { get; set; }

        protected DuraformEnquiryDto()
        {
            DuraformComponents = new Collection<DuraformComponentDto>();

            MiscComponents = new Collection<DuraformMiscComponentDto>();

            DuraformFiles = new Collection<DuraformFileDto>();

            DuraformProcesses = new Collection<DuraformProcessDto>();
        }
    }
}