namespace _3_Application.Dtos.DuraformDoor
{
    public class DuraformDoorForOrderMenu
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }

        public _1_Domain.DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public int? FixedEdgeProfileId { get; set; }

        public int? DefaultEdgeProfileId { get; set; }

        public string FixedEdgeProfileName { get; set; }

        public string DefaultEdgeProfileName { get; set; }
    }
}