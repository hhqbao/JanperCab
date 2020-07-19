namespace _3_Application.Dtos.DuraformComponent
{
    public class DuraformEndPanelDto : DuraformComponentWithOptionDto
    {
        public int NumberOfShields { get; set; }

        public decimal RailLeft { get; set; }

        public decimal RailCenter { get; set; }

        public decimal RailRight { get; set; }

        public decimal? ExtraRailBottom { get; set; }

        public decimal? ExtraRailTop { get; set; }
    }
}