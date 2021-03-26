using _1_Domain.Enum;

namespace _3_Application.Dtos.Process
{
    public abstract class DuraformProcessDto : ProcessDto
    {
        public DuraformProcessEnum DuraformProcessType { get; set; }
    }
}