using System;

namespace _1_Domain
{
    public class DuraformOptionDoubleSided : DuraformOption
    {
        public bool HasProfile { get; set; }

        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (component)
            {
                case DuraformDrawer drawer:
                    throw new NotImplementedException();
                default:
                    if (!HasProfile)
                        line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.NO_FACE_TOOLING;

                    line.MATERIAL = $"RAW{line.DIMZ} MDF";
                    break;
            }
        }

        public override string GetInvoiceDescription()
        {
            var desc = "Double Sided ";

            desc += HasProfile ? " With Profile" : " No Profile";

            return desc;
        }
    }
}