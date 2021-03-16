using _1_Domain.Enum;
using System.Collections.Generic;

namespace _1_Domain
{
    public abstract class DuraformComponent
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public decimal Height { get; set; }

        public decimal Width { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public bool Top { get; set; }

        public bool Bottom { get; set; }

        public bool Left { get; set; }

        public bool Right { get; set; }

        public string Note { get; set; }

        public decimal Price { get; set; }

        public int SortNumber { get; set; }

        public int DuraformEnquiryId { get; set; }

        public abstract ICB_TYPE_ENUM ICBTYPE { get; }

        public abstract List<ICBLineStructure> ExportIcbLinesStructure();

        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }

        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}