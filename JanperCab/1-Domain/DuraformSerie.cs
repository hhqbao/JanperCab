using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformSerie
    {
        public int Id { get; set; }

        public string Name { get; set; }


        public virtual ICollection<DuraformDesign> DuraformDesigns { get; set; }

        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public virtual ICollection<DuraformPriceGrid> DuraformPriceGrids { get; set; }


        public DuraformSerie()
        {
            DuraformDesigns = new Collection<DuraformDesign>();
            DuraformForms = new Collection<DuraformForm>();
            DuraformPriceGrids = new Collection<DuraformPriceGrid>();
        }
    }
}