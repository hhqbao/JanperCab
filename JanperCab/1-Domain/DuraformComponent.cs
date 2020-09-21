using System;

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

        public int SortNumber { get; set; }

        public Guid DuraformFormId { get; set; }


        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }

        public virtual DuraformForm DuraformForm { get; set; }
    }
}