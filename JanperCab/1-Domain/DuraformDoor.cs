namespace _1_Domain
{
    public class DuraformDoor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPopular { get; set; }


        public DuraformSerie.DuraformSerieKey DuraformSerieId { get; set; }

        public virtual DuraformSerie DuraformSerie { get; set; }
    }
}