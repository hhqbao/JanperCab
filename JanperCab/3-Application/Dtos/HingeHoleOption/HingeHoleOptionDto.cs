using _1_Domain.Enum;

namespace _3_Application.Dtos.HingeHoleOption
{
    public abstract class HingeHoleOptionDto
    {
        public int Id { get; set; }

        public HingeHoleStyleEnum HingeHoleStyle { get; set; }
    }
}