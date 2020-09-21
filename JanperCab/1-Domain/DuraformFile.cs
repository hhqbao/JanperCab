using System;

namespace _1_Domain
{
    public class DuraformFile : ApplicationFile
    {
        public Guid DuraformFormId { get; set; }

        public string Description { get; set; }


        public virtual DuraformForm DuraformForm { get; set; }
    }
}