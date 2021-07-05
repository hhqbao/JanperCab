using _1_Domain.Enum;

namespace _1_Domain
{
    public abstract class HingeHoleOption
    {
        public int Id { get; set; }

        public HingeHoleStyleEnum HingeHoleStyle { get; set; }

        public virtual DuraformComponentWithOptionAndHingeHole DuraformComponentWithOptionAndHingeHole { get; set; }

        public virtual HingeHoleStyle HingeStyle { get; set; }
    }
}