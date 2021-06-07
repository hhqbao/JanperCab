namespace _3_Application.Dtos.DuraformEdgeProfile
{
    public class DuraformEdgeProfileDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool? ForceTop { get; set; }

        public bool? ForceBottom { get; set; }

        public bool? ForceLeft { get; set; }

        public bool? ForceRight { get; set; }

        public bool HideInDoor { get; set; }

        public bool HideInPantry { get; set; }

        public bool HideInPanel { get; set; }

        public bool HideInDrawer { get; set; }
    }
}