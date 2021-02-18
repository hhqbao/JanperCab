using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public class HingeHoleStyle
    {
        public HingeHoleStyleEnum Id { get; set; }

        public string Name { get; set; }

        public decimal DoorPrice { get; set; }

        public decimal PantryPrice { get; set; }


        public virtual ICollection<HingeHoleOption> HingeHoleOptions { get; set; }
    }
}