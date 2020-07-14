namespace _1_Domain
{
    public class DuraformPantryDoor : DuraformComponentWithOptionAndHingeHole
    {
        public decimal ChairRailHeight { get; set; }

        public int ChairRailTypeId { get; set; }

        public decimal ExtraRailBottom { get; set; }


        public virtual PantryDoorChairRailType ChairRailType { get; set; }

        public virtual DuraformForm DuraformForm { get; set; }
    }
}