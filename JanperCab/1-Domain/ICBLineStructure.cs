using _1_Domain.Enum;

namespace _1_Domain
{
    public class ICBLineStructure
    {
        public const string NO_FACE_TOOLING = "NFRPANEL";
        public const string MICROWAVE_TOOLING = "APPLIANCE";
        public const string CORNER_RADIUS_VALUE = "G_CORNER_RADIUS";
        public const string DRAWER_TOOLING_FILE_VALUE = "RADIUS";
        public const string ROUTER_ONLY = "ROUTER ONLY";
        public const string DWS = "DWS";

        public ICB_TYPE_ENUM TYPE { get; set; }

        public string SHAPE_FILE { get; set; }

        public string EXTERNAL_SHAPE_FILE { get; set; }

        public int DIMX { get; set; }

        public int DIMY { get; set; }

        public int DIMZ { get; set; }

        public int BT { get; set; }

        public int BB { get; set; }

        public int BL { get; set; }

        public int BR { get; set; }

        public int ABB { get; set; }

        public int AH { get; set; }

        public int EDGE_TOP { get; set; }

        public int EDGE_BOTTOM { get; set; }

        public int EDGE_LEFT { get; set; }

        public int EDGE_RIGHT { get; set; }

        public string CORNER_RADIUS { get; set; }

        public string TOOLING_FILE { get; set; }

        public string TOOLING_FILE2 { get; set; }

        public string EDGE_TOOLING_FILE { get; set; }

        public string DRAWER_TOOLING_FILE { get; set; }

        public int OFFT { get; set; }

        public int OFFB { get; set; }

        public int OFFL { get; set; }

        public int OFFR { get; set; }

        public decimal EDGETHICK { get; set; }

        public int USERVAR1 { get; set; }

        public int USERVAR2 { get; set; }

        public int USERVAR3 { get; set; }

        public int USERVAR4 { get; set; }

        public int USERVAR5 { get; set; }

        public int USERVAR6 { get; set; }

        public int USERVAR7 { get; set; }

        public int USERVAR8 { get; set; }

        public int BD_MATCHING { get; set; }

        public string SHAPE_FILE2 { get; set; }

        public int BDH { get; set; }

        public int BDBT { get; set; }

        public int BDH_ADDON { get; set; }

        public int NOPN { get; set; }

        public int PANDIV { get; set; }

        public int VAR_DIV { get; set; }

        public string VARDIVSTRING { get; set; }

        public int SPLIT_PANEL { get; set; }

        public int V_SPLIT_Q { get; set; }

        public int H_SPLIT_Q { get; set; }

        public int V_SPLIT { get; set; }

        public int H_SPLIT { get; set; }

        public int SPLIT_PANEL_UPPER { get; set; }

        public int V_SPLIT_Q_UPPER { get; set; }

        public int H_SPLIT_Q_UPPER { get; set; }

        public int V_SPLIT_UPPER { get; set; }

        public int H_SPLIT_UPPER { get; set; }

        public int SLICE_ON { get; set; }

        public int DRAW_NUM { get; set; }

        public int GAP { get; set; }

        public int DRAWER_NUM { get; set; }

        public int DRAWER1 { get; set; }

        public int DRAWER2 { get; set; }

        public int DRAWER3 { get; set; }

        public int DRAWER4 { get; set; }

        public int DRAWER5 { get; set; }

        public int DRAWER6 { get; set; }

        public int DRAWER7 { get; set; }

        public int DRAWER8 { get; set; }

        public int SLICE_WIDTH { get; set; }

        public int JOBNUMBER { get; set; }

        public string ACCOUNTNUMBER { get; set; }

        public string JOBNUMBERCUST { get; set; }

        public string DOORFINISH { get; set; }

        public string DOORCOLOR { get; set; }

        public string CNCCODE { get; set; }

        public string MATERIAL { get; set; }

        public string CNCTYPE { get; set; }

        public int QUANTITY { get; set; }

        public string DESCRIPTION { get; set; }

        public ICBLineStructure(DuraformComponent component)
        {
            var design = component.DuraformEnquiry.DuraformDesign;
            var edgeProfile = component.DuraformEdgeProfile;

            TYPE = string.IsNullOrEmpty(design.ICB_EXTERNAL_SHAPE_FILE) ? component.ICBTYPE : ICB_TYPE_ENUM.EXTERNAL_SHAPE;
            SHAPE_FILE = "SQUARE";
            EXTERNAL_SHAPE_FILE = design.ICB_EXTERNAL_SHAPE_FILE;
            DIMX = (int)component.Height;
            DIMY = (int)component.Width;
            DIMZ = (int)component.DuraformEnquiry.DuraformDesign.Thickness;
            BT = component.DuraformEnquiry.DuraformDesign.BT;
            BB = component.DuraformEnquiry.DuraformDesign.BB;
            BL = component.DuraformEnquiry.DuraformDesign.BL;
            BR = component.DuraformEnquiry.DuraformDesign.BR;
            ABB = 0;
            AH = 0;
            EDGE_TOP = component.Top ? 0 : 1;
            EDGE_BOTTOM = component.Bottom ? 0 : 1;
            EDGE_LEFT = component.Left ? 0 : 1;
            EDGE_RIGHT = component.Right ? 0 : 1;
            CORNER_RADIUS = CORNER_RADIUS_VALUE;
            TOOLING_FILE = component.DuraformEnquiry.DuraformDesign.ICB_TOOLING;
            TOOLING_FILE2 = component.DuraformEnquiry.DuraformDesign.ICB_TOOLING;
            EDGE_TOOLING_FILE = component.DuraformEdgeProfile.ICB_EDGE_TOOLING;
            DRAWER_TOOLING_FILE = DRAWER_TOOLING_FILE_VALUE;
            OFFT = (int)(component.Height > 100 ? 0 : 100 - component.Height);
            OFFB = 0;
            OFFL = 0;
            OFFR = (int)(component.Width > 100 ? 0 : 100 - component.Width);
            EDGETHICK = component.DuraformEnquiry.IsRoutingOnly ? 0 : component.DuraformEnquiry.DuraformWrapType.ICB_EDGETHICK;
            USERVAR1 = edgeProfile.UserVar1 ?? 0;
            USERVAR2 = edgeProfile.UserVar2 ?? 0;
            USERVAR3 = edgeProfile.UserVar3 ?? 0;
            USERVAR4 = edgeProfile.UserVar4 ?? 0;
            USERVAR5 = edgeProfile.UserVar5 ?? 0;
            USERVAR6 = edgeProfile.UserVar6 ?? 0;
            USERVAR7 = edgeProfile.UserVar7 ?? 0;
            USERVAR8 = edgeProfile.UserVar8 ?? 0;
            BD_MATCHING = 0;
            SHAPE_FILE2 = "SQUARE";
            BDH = 0;
            BDBT = 0;
            BDH_ADDON = 0;
            NOPN = 0;
            PANDIV = 0;
            VAR_DIV = 0;
            VARDIVSTRING = string.Empty;
            SPLIT_PANEL = 0;
            V_SPLIT_Q = 0;
            H_SPLIT_Q = 0;
            V_SPLIT = component.DuraformEnquiry.DuraformDesign.V_SPLIT_THICKNESS;
            H_SPLIT = component.DuraformEnquiry.DuraformDesign.H_SPLIT_THICKNESS;
            SPLIT_PANEL_UPPER = 0;
            V_SPLIT_Q_UPPER = 0;
            H_SPLIT_Q_UPPER = 0;
            V_SPLIT_UPPER = 0;
            H_SPLIT_UPPER = 0;
            SLICE_ON = 0;
            DRAW_NUM = 0;
            GAP = 0;
            DRAWER_NUM = 0;
            DRAWER1 = 0;
            DRAWER2 = 0;
            DRAWER3 = 0;
            DRAWER4 = 0;
            DRAWER5 = 0;
            DRAWER6 = 0;
            DRAWER7 = 0;
            DRAWER8 = 0;
            SLICE_WIDTH = 0;
            JOBNUMBER = component.DuraformEnquiry.Id;
            ACCOUNTNUMBER = component.DuraformEnquiry.CabinetMaker.Name.Replace(",", "_").Replace(" ", "_").ToUpper();
            JOBNUMBERCUST = component.DuraformEnquiry.CustomerReference;
            DOORFINISH = component.DuraformEnquiry.IsRoutingOnly ? ROUTER_ONLY : component.DuraformEnquiry.DuraformWrapType.Name.ToUpper();
            DOORCOLOR = component.DuraformEnquiry.IsRoutingOnly ? DWS : $"{component.DuraformEnquiry.DuraformWrapColor.Name.ToUpper()} {component.DuraformEnquiry.DuraformWrapType.Name.ToUpper()}";
            CNCCODE = "DOOR";
            MATERIAL = component.DuraformEnquiry.IsRoutingOnly ? $"DSW{DIMZ} MDF" : $"SS{DIMZ} MDF";
            CNCTYPE = "DOOR";
            QUANTITY = component.Quantity;
            DESCRIPTION = component.Note.ToUpper();
        }

        public string ExportCSVLine()
        {
            return $"{(int)TYPE},{SHAPE_FILE},{EXTERNAL_SHAPE_FILE},{DIMX},{DIMY},{DIMZ},{BT},{BB},{BL},{BR},{ABB},{AH},{EDGE_TOP},{EDGE_BOTTOM},{EDGE_LEFT},{EDGE_RIGHT},{CORNER_RADIUS},{TOOLING_FILE},{TOOLING_FILE2},{EDGE_TOOLING_FILE},{DRAWER_TOOLING_FILE},{OFFT},{OFFB},{OFFL},{OFFR},{EDGETHICK},{USERVAR1},{USERVAR2},{USERVAR3},{USERVAR4},{USERVAR5},{USERVAR6},{USERVAR7},{USERVAR8},{BD_MATCHING},{SHAPE_FILE2},{BDH},{BDBT},{BDH_ADDON},{NOPN},{PANDIV},{VAR_DIV},{VARDIVSTRING},{SPLIT_PANEL},{V_SPLIT_Q},{H_SPLIT_Q},{V_SPLIT},{H_SPLIT},{SPLIT_PANEL_UPPER},{V_SPLIT_Q_UPPER},{H_SPLIT_Q_UPPER},{V_SPLIT_UPPER},{H_SPLIT_UPPER},{SLICE_ON},{DRAW_NUM},{GAP},{DRAWER_NUM},{DRAWER1},{DRAWER2},{DRAWER3},{DRAWER4},{DRAWER5},{DRAWER6},{DRAWER7},{DRAWER8},{SLICE_WIDTH},{JOBNUMBER},{ACCOUNTNUMBER},{JOBNUMBERCUST},{DOORFINISH},{DOORCOLOR},{CNCCODE},{MATERIAL},{CNCTYPE},{QUANTITY}";
        }
    }
}