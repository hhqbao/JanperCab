using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformSerie
    {
        public enum DuraformSerieKey
        {
            SerieOne = 1,
            SerieTwo = 2,
            SerieThree = 3,
            SerieFour = 4,
            SerieFive = 5
        }

        public DuraformSerieKey Id { get; set; }

        public string Name { get; set; }


        public virtual ICollection<DuraformDoor> DuraformDoors { get; set; }



        public DuraformSerie()
        {
            DuraformDoors = new Collection<DuraformDoor>();
        }
    }
}