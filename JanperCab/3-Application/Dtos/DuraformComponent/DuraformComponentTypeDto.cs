namespace _3_Application.Dtos.DuraformComponent
{
    public enum ComponentType
    {
        DuraformDoor = 1,
        DuraformPantryDoor = 2,
        DuraformEndPanel = 3,
        DuraformDrawer = 4
    }

    public class DuraformComponentTypeDto
    {
        public ComponentType Id { get; set; }

        public string Type { get; set; }
    }
}