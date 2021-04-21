using System;

namespace _1_Domain
{
    public class DuraformOptionRollerShutterFrame : DuraformOption
    {
        public decimal TopSize { get; set; }

        public decimal LeftSize { get; set; }

        public decimal RightSize { get; set; }

        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (component)
            {
                case DuraformDoor door:
                    line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.MICROWAVE_TOOLING;
                    line.BT = (int)TopSize;
                    line.BB = -15;
                    line.BL = (int)LeftSize;
                    line.BR = (int)RightSize;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public override string GetInvoiceDescription()
        {
            return $"Roller Shutter T{TopSize:F0} x L{LeftSize:F0} x R{RightSize:F0}";
        }
    }
}