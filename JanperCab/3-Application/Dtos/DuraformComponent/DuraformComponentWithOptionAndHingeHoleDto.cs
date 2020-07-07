using _3_Application.Dtos.HingeHoleOption;

namespace _3_Application.Dtos.DuraformComponent
{
    public abstract class DuraformComponentWithOptionAndHingeHoleDto : DuraformComponentWithOptionDto
    {
        public HingeHoleOptionDto HingeHoleOption { set; get; }
    }
}