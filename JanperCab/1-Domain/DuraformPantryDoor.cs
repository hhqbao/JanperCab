using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public class DuraformPantryDoor : DuraformComponentWithOptionAndHingeHole
    {
        public decimal ChairRailHeight { get; set; }

        public int ChairRailTypeId { get; set; }

        public decimal? ExtraRailBottom { get; set; }

        public override ICB_TYPE_ENUM ICBTYPE => ICB_TYPE_ENUM.PANTRY;

        public virtual PantryDoorChairRailType ChairRailType { get; set; }

        public override List<ICBLineStructure> ExportIcbLinesStructure()
        {
            var line = new ICBLineStructure(this)
            {
                ABB = ExtraRailBottom.HasValue ? (int)ExtraRailBottom : 0,
                BDH = (int)ChairRailHeight,
                BDBT = DuraformEnquiry.DuraformDesign.BB,
                BDH_ADDON = ChairRailType.Name.Equals("Single") ? 0 : DuraformEnquiry.DuraformDesign.BB
            };

            DuraformOption?.UpdateIcbLineStructure(this, line);

            return new List<ICBLineStructure> { line };
        }
    }
}