using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public class DuraformEndPanel : DuraformComponentWithOption
    {
        public int NumberOfShields { get; set; }

        public decimal RailLeft { get; set; }

        public decimal RailCenter { get; set; }

        public decimal RailRight { get; set; }

        public decimal? ExtraRailBottom { get; set; }

        public decimal? ExtraRailTop { get; set; }

        public override ICB_TYPE_ENUM ICBTYPE => ICB_TYPE_ENUM.END_PANEL;


        public override List<ICBLineStructure> ExportIcbLinesStructure()
        {
            var line = new ICBLineStructure(this)
            {
                BL = (int)RailLeft,
                BR = (int)RailRight,
                ABB = ExtraRailBottom.HasValue ? (int)ExtraRailBottom.Value : 0,
                NOPN = NumberOfShields,
                PANDIV = NumberOfShields > 1 ? (int)RailCenter : 0,
                CNCTYPE = "IB"
            };

            line.BT += ExtraRailTop.HasValue ? (int)ExtraRailTop.Value : 0;

            DuraformOption?.UpdateIcbLineStructure(this, line);

            return new List<ICBLineStructure> { line };
        }

        public override string GetInvoiceDescription()
        {
            var desc = $"IB Back - {Height:F0} x {Width:F0} - {NumberOfShields} shields - {RailLeft:F0} x {RailCenter:F0} x {RailRight:F0}";

            desc += ExtraRailBottom.HasValue ? $" - BOT={ExtraRailBottom:F0}" : string.Empty;

            desc += ExtraRailTop.HasValue ? $" - TOP={ExtraRailTop:F0}" : string.Empty;

            if (DuraformOption != null)
                desc += $" - {DuraformOption.GetInvoiceDescription()}";

            return desc;
        }
    }
}