using _1_Domain.Enum;

namespace _3_Application.Dtos.HingeHoleOption
{
    public class HingeHoleStyleDto
    {
        public string ClassType
        {
            get
            {
                return Id switch
                {
                    HingeHoleStyleEnum.Side => typeof(HingeHoleOptionSideDto).AssemblyQualifiedName,
                    HingeHoleStyleEnum.Draw => typeof(HingeHoleOptionDrawDto).AssemblyQualifiedName,
                    HingeHoleStyleEnum.CornerDoor => typeof(HingeHoleOptionCornerDoorDto).AssemblyQualifiedName,
                    HingeHoleStyleEnum.CornerBlank => typeof(HingeHoleOptionCornerBlankDto).AssemblyQualifiedName,
                    _ => string.Empty
                };
            }
        }

        public HingeHoleStyleEnum Id { get; set; }

        public string Name { get; set; }

        public decimal DoorPrice { get; set; }

        public decimal PantryPrice { get; set; }
    }
}