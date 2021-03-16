using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public class DuraformOptionPaneFrame : DuraformOption
    {
        public int Columns { get; set; }

        public int Rows { get; set; }

        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            line.SPLIT_PANEL = 1;

            switch (line.TYPE)
            {
                case ICB_TYPE_ENUM.DOOR:
                    line.TOOLING_FILE = line.TOOLING_FILE2 = component.DuraformEnquiry.DuraformDesign.ICB_GLASS_TOOLING;
                    line.V_SPLIT_Q = Columns - 1;
                    line.H_SPLIT_Q = Rows - 1;
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