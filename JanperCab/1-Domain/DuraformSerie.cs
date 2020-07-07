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


        public virtual ICollection<DuraformDesign> DuraformDesigns { get; set; }

        public ICollection<DuraformForm> DuraformForms { get; set; }


        public DuraformSerie()
        {
            DuraformDesigns = new Collection<DuraformDesign>();
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}