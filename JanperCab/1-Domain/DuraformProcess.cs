using _1_Domain.Enum;

namespace _1_Domain
{
    public abstract class DuraformProcess : Process
    {
        public DuraformProcessEnum DuraformProcessType { get; set; }

        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}