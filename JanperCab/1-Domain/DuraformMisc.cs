using System;

namespace _1_Domain
{
    public class DuraformMisc
    {
        public int Id { get; set; }

        public Guid DuraformFormId { get; set; }

        public int SortNumber { get; set; }

        public int Quantity { get; set; }

        public int MiscItemId { get; set; }

        public string Note { get; set; }


        public virtual MiscItem MiscItem { get; set; }

        public virtual DuraformForm DuraformForm { get; set; }
    }
}