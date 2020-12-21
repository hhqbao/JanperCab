using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public class DuraformOptionMicrowaveFrame : DuraformOption
    {
        public decimal TopSize { get; set; }

        public decimal BottomSize { get; set; }

        public decimal LeftSize { get; set; }

        public decimal RightSize { get; set; }

        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (line.TYPE)
            {
                case ICB_TYPE_ENUM.DOOR:
                    line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.MICROWAVE_TOOLING;
                    line.BT = (int)TopSize;
                    line.BB = (int)BottomSize;
                    line.BL = (int)LeftSize;
                    line.BR = (int)RightSize;
                    break;
                case ICB_TYPE_ENUM.PANTRY:
                    throw new NotImplementedException();
                case ICB_TYPE_ENUM.END_PANEL:
                    throw new NotImplementedException();
                case ICB_TYPE_ENUM.DRAWER:
                    throw new NotImplementedException();
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}