using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public class DuraformOptionNoFace : DuraformOption
    {
        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (line.TYPE)
            {
                case ICB_TYPE_ENUM.DOOR:
                    line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.NO_FACE_TOOLING;
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