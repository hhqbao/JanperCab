using _1_Domain.Enum;

namespace _3_Application.Dtos.HingeHoleOption
{
    public class HingeHoleStyleDto
    {
        public HingeHoleStyleEnum Id { get; set; }

        public string Name { get; set; }

        public decimal DoorPrice { get; set; }

        public decimal PantryPrice { get; set; }
    }
}