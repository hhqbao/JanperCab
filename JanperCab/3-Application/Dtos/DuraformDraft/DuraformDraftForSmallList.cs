using System;

namespace _3_Application.Dtos.DuraformDraft
{
    public class DuraformDraftForSmallList
    {
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Description { get; set; }

        public DateTime? LastUpdated { get; set; }
    }
}