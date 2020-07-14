namespace _3_Application.Dtos.DuraformComponent
{
    public class DuraformPantryDoorDto : DuraformComponentWithOptionAndHingeHoleDto
    {
        public decimal ChairRailHeight { get; set; }

        public int ChairRailTypeId { get; set; }

        public decimal ExtraRailBottom { get; set; }
    }
}