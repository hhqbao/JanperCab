using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public class DuraformDoor : DuraformComponentWithOptionAndHingeHole
    {
        public override ICB_TYPE_ENUM ICBTYPE => ICB_TYPE_ENUM.DOOR;

        public override List<ICBLineStructure> ExportIcbLinesStructure()
        {
            var line = new ICBLineStructure(this);

            DuraformOption?.UpdateIcbLineStructure(this, line);

            return new List<ICBLineStructure> { line };
        }
    }
}