using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class DuraformEdgeProfile
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool? ForcedValuePerItem { get; set; }


        public ICollection<DuraformDoor> DuraformDoorsWithFixed { get; set; }

        public ICollection<DuraformDoor> DuraformDoorsWithDefault { get; set; }

        public DuraformEdgeProfile()
        {
            DuraformDoorsWithFixed = new Collection<DuraformDoor>();
            DuraformDoorsWithDefault = new Collection<DuraformDoor>();
        }
    }
}