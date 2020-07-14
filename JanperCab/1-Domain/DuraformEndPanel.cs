namespace _1_Domain
{
    public class DuraformEndPanel : DuraformComponentWithOption
    {
        public int NumberOfShields { get; set; }

        public decimal RailLeft { get; set; }

        public decimal RailCenter { get; set; }

        public decimal RailRight { get; set; }

        public decimal ExtraRailBottom { get; set; }

        public decimal ExtraRailTop { get; set; }


        public virtual DuraformForm DuraformForm { get; set; }
    }
}