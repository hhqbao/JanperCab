using _1_Domain.Enum;
using System;
using System.Collections.Generic;

namespace _1_Domain
{
    public class DuraformDrawer : DuraformComponent
    {
        public int NumberOfDrawers { get; set; }

        public int DuraformDrawerTypeId { get; set; }

        public bool HasDrillFronts { get; set; }

        public decimal DrawerGap { get; set; }

        public decimal? DrawerOne { set; get; }

        public decimal? DrawerTwo { get; set; }

        public decimal? DrawerThree { get; set; }

        public decimal? DrawerFour { get; set; }

        public decimal? DrawerFive { get; set; }

        public decimal TotalHeight
        {
            get
            {
                var totalGap = (NumberOfDrawers - 1) * DrawerGap;
                var drawer1 = DrawerOne ?? 0;
                var drawer2 = DrawerTwo ?? 0;
                var drawer3 = DrawerThree ?? 0;
                var drawer4 = DrawerFour ?? 0;
                var drawer5 = DrawerFive ?? 0;

                return drawer1 + drawer2 + drawer3 + drawer4 + drawer5 + totalGap;
            }
        }


        public override ICB_TYPE_ENUM ICBTYPE => ICB_TYPE_ENUM.DRAWER;

        public virtual DuraformDrawerType DuraformDrawerType { get; set; }

        public override List<ICBLineStructure> ExportIcbLinesStructure()
        {
            var list = new List<ICBLineStructure>();

            switch (DuraformDrawerType.DrawerDesign)
            {
                case DrawerDesign.Single:
                    var line = new ICBLineStructure(this)
                    {
                        DIMX = (int)TotalHeight,
                        SLICE_ON = 1,
                        SLICE_WIDTH = 20, //TODO remove fixed value
                        DRAWER_NUM = NumberOfDrawers,
                        DRAWER1 = DrawerOne.HasValue ? (int)DrawerOne.Value : 0,
                        DRAWER2 = DrawerTwo.HasValue ? (int)DrawerTwo.Value : 0,
                        DRAWER3 = DrawerThree.HasValue ? (int)DrawerThree.Value : 0,
                        DRAWER4 = DrawerFour.HasValue ? (int)DrawerFour.Value : 0,
                        DRAWER5 = DrawerFive.HasValue ? (int)DrawerFive.Value : 0,
                        DRAWER6 = 0,
                        DRAWER7 = 0,
                        DRAWER8 = 0,
                        CNCTYPE = "DRAWER"
                    };

                    list.Add(line);
                    break;
                case DrawerDesign.Individual:
                    var index = 1;
                    while (index <= NumberOfDrawers)
                    {
                        list.Add(ExportIndividualDrawerLine(index));

                        index++;
                    }
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return list;
        }

        public override string GetInvoiceDescription()
        {
            var desc = $"{DuraformDrawerType.Name} Drawer - {Height:F0} x {Width:F0} - {DrawerOne:F0} | {DrawerTwo:F0} | {DrawerThree:F0} | {DrawerFour:F0} | {DrawerFive:F0}";

            if (HasDrillFronts)
                desc += " - Drill Front";

            return desc;
        }

        private ICBLineStructure ExportIndividualDrawerLine(int drawerNumber)
        {
            var design = DuraformEnquiry.DuraformDesign;
            var topOffset = (int)(design.BT / 2 - design.DrawerBorderOffset);
            var bottomOffset = (int)(design.BB / 2 - design.DrawerBorderOffset);

            var line = new ICBLineStructure(this)
            {
                TYPE = ICB_TYPE_ENUM.DOOR,
                BT = drawerNumber == 1 ? design.BT : topOffset,
                BB = NumberOfDrawers == drawerNumber ? design.BB : bottomOffset,
            };

            line.EDGE_TOP = drawerNumber == 1 ? line.EDGE_TOP : 0;
            line.EDGE_BOTTOM = NumberOfDrawers == drawerNumber ? line.EDGE_BOTTOM : 0;

            line.DIMX = drawerNumber switch
            {
                1 => (int)(DrawerOne ?? 0),
                2 => (int)(DrawerTwo ?? 0),
                3 => (int)(DrawerThree ?? 0),
                4 => (int)(DrawerFour ?? 0),
                5 => (int)(DrawerFive ?? 0),
                _ => throw new NotImplementedException(),
            };
            return line;
        }
    }
}