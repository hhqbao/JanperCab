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

        public string ICB_EDGE_TOOLING { get; set; }
    }
}