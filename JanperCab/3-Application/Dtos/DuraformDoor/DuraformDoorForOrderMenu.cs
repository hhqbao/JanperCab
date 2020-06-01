namespace _3_Application.Dtos.DuraformDoor
{
    public class DuraformDoorForOrderMenu
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }

        public _1_Domain.DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }
    }
}