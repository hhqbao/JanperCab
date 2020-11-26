using System;

namespace _3_Application.Dtos.DuraformForm
{
    public class DuraformMiscDto
    {
        public int Id { get; set; }

        public Guid DuraformFormId { get; set; }

        public int SortNumber { get; set; }

        public int Quantity { get; set; }

        public int MiscItemId { get; set; }

        public string Note { get; set; }
    }
}