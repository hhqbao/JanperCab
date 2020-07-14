using System.Collections.Generic;

namespace _1_Domain
{
    public class DuraformOptionType
    {
        public enum DuraformOptionTypeKey
        {
            NoFaceRoute = 1,
            DoubleSided = 2,
            FoldBack = 3,
            PaneFrame = 4,
        }

        public DuraformOptionTypeKey Id { get; set; }

        public string Name { get; set; }


        public virtual ICollection<DuraformOption> DuraformOptions { get; set; }
    }
}