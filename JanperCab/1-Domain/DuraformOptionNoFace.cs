using System;

namespace _1_Domain
{
    public class DuraformOptionNoFace : DuraformOption
    {
        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (component)
            {
                case DuraformDoor door:
                    line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.NO_FACE_TOOLING;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public override string GetInvoiceDescription()
        {
            return "Plain Panel";
        }
    }
}