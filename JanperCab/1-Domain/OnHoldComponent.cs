using System;

namespace _1_Domain
{
    public class OnHoldComponent
    {
        public int Id { get; set; }

        public int ProcessId { get; set; }

        public DateTime CreatedDate { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }


        public virtual Process Process { get; set; }

        public OnHoldComponent()
        {
            CreatedDate = DateTime.Now;
        }
    }
}