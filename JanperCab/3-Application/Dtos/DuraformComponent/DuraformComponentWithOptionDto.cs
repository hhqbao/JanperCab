using _3_Application.Dtos.DuraformOption;

namespace _3_Application.Dtos.DuraformComponent
{
    public abstract class DuraformComponentWithOptionDto : DuraformComponentDto
    {
        public DuraformOptionDto DuraformOption { get; set; }
    }
}