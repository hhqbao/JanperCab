using System;
using System.Collections.Generic;

namespace _1_Domain
{
    public class ICBFileStructure
    {
        private readonly string[] headers = new[]
        {
            "TYPE", "SHAPE_FILE$", "EXTERNAL_SHAPE_FILE$", "DIMX", "DIMY", "DIMZ", "BT", "BB", "BL", "BR", "ABB", "AH",
            "EDGE_TOP", "EDGE_BOTTOM", "EDGE_LEFT", "EDGE_RIGHT", "CORNER_RADIUS", "TOOLING_FILE$", "TOOLING_FILE2$",
            "EDGE_TOOLING_FILE$", "DRAWER_TOOLING_FILE$", "OFFT", "OFFB", "OFFL", "OFFR", "EDGETHICK", "USERVAR1",
            "USERVAR2", "USERVAR3", "USERVAR4", "USERVAR5", "USERVAR6", "USERVAR7", "USERVAR8", "BD_MATCHING",
            "SHAPE_FILE2$", "BDH", "BDBT", "BDH_ADDON", "NOPN", "PANDIV", "VAR_DIV", "VARDIVSTRING$", "SPLIT_PANEL",
            "V_SPLIT_Q", "H_SPLIT_Q", "V_SPLIT", "H_SPLIT", "SPLIT_PANEL_UPPER", "V_SPLIT_Q_UPPER", "H_SPLIT_Q_UPPER",
            "V_SPLIT_UPPER", "H_SPLIT_UPPER", "SLICE_ON", "DRAW_NUM", "GAP", "DRAWER_NUM", "DRAWER1", "DRAWER2",
            "DRAWER3", "DRAWER4", "DRAWER5", "DRAWER6", "DRAWER7", "DRAWER8", "SLICE_WIDTH", "JOBNUMBER",
            "ACCOUNTNUMBER", "JOBNUMBERCUST", "DOORFINISH", "DOORCOLOR", "CNCCODE", "MATERIAL", "CNCTYPE", "QUANTITY"
        };

        public List<ICBLineStructure> IcbRows { get; }

        public ICBFileStructure()
        {
            IcbRows = new List<ICBLineStructure>();
        }

        public string ExportCSVString()
        {
            var headerString = string.Join(',', headers);
            var content = headerString + Environment.NewLine;

            foreach (var row in IcbRows)
            {
                content += row.ExportCSVLine() + Environment.NewLine;
            }

            return content;
        }
    }
}