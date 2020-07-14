using System.Collections.Generic;

namespace _1_Domain
{
    public class PantryDoorChairRailType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDisabled { get; set; }


        public virtual ICollection<DuraformPantryDoor> DuraformPantryDoors { get; set; }
    }
}