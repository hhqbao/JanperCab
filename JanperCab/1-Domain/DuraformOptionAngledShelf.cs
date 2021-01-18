using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public class DuraformOptionAngledShelf : DuraformOption
    {
        public decimal SideOne { get; set; }

        public decimal SideTwo { get; set; }

        public bool IsDoubleSided { get; set; }


        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (component)
            {
                case DuraformDoor _:
                    line.TYPE = ICB_TYPE_ENUM.EXTERNAL_SHAPE;
                    line.EXTERNAL_SHAPE_FILE = "ANGLED_SHELF";
                    line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.NO_FACE_TOOLING;
                    line.USERVAR1 = (int)SideOne;
                    line.USERVAR2 = (int)SideTwo;

                    if (IsDoubleSided)
                        line.MATERIAL = $"RAW{line.DIMZ} MDF";
                    break;
                default:
                    throw new NotImplementedException("Not Support Other Types Of Components");
            }
        }
    }
}