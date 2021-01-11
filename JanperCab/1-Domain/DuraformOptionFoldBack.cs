using System;

namespace _1_Domain
{
    public enum FoldingType
    {
        Left = 1,
        Right = 2,
        Double = 3
    }

    public class DuraformOptionFoldBack : DuraformOption
    {
        public bool HasProfile { get; set; }

        public decimal LeftLength { get; set; }

        public decimal RightLength { get; set; }

        public decimal Thickness { get; set; }

        public FoldingType FoldingType { get; set; }

        public decimal TotalExtraWidth
        {
            get
            {
                return FoldingType switch
                {
                    FoldingType.Left => LeftLength + Thickness,
                    FoldingType.Right => RightLength + Thickness,
                    FoldingType.Double => (LeftLength + RightLength) + 2 * Thickness,
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
        }

        public override void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line)
        {
            switch (component)
            {
                case DuraformDrawer drawer:
                    throw new NotImplementedException();
                default:
                    line.DIMY += (int)TotalExtraWidth;

                    if (!HasProfile)
                        line.TOOLING_FILE = line.TOOLING_FILE2 = ICBLineStructure.NO_FACE_TOOLING;

                    if (FoldingType == FoldingType.Left || FoldingType == FoldingType.Double)
                        line.BL += (int)(LeftLength + Thickness);

                    if (FoldingType == FoldingType.Right || FoldingType == FoldingType.Double)
                        line.BR += (int)(RightLength + Thickness);
                    break;
            }
        }
    }
}