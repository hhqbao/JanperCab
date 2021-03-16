using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformEnquiry : Enquiry
    {
        public int DuraformDesignId { get; set; }

        public int DuraformSerieId { get; set; }

        public bool IsRoutingOnly { get; set; }

        public int? DuraformWrapTypeId { get; set; }

        public int? DuraformWrapColorId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public int? HingeHoleTypeId { get; set; }

        public int? DuraformArchId { get; set; }


        public virtual DuraformDesign DuraformDesign { get; set; }

        public virtual DuraformSerie DuraformSerie { get; set; }

        public virtual DuraformWrapType DuraformWrapType { get; set; }

        public virtual DuraformWrapColor DuraformWrapColor { get; set; }

        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }

        public virtual HingeHoleType HingeHoleType { get; set; }

        public virtual DuraformArch DuraformArch { get; set; }



        public virtual ICollection<DuraformComponent> DuraformComponents { get; set; }

        public virtual ICollection<DuraformMiscComponent> MiscComponents { get; set; }

        public virtual ICollection<DuraformFile> DuraformFiles { get; set; }

        public virtual ICollection<DuraformProcess> DuraformProcesses { get; set; }

        public DuraformEnquiry()
        {
            DuraformComponents = new Collection<DuraformComponent>();
            MiscComponents = new Collection<DuraformMiscComponent>();
            DuraformFiles = new Collection<DuraformFile>();
            DuraformProcesses = new Collection<DuraformProcess>();
        }
    }
}