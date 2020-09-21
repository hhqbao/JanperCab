using System;

namespace _3_Application.Dtos.ApplicationFile
{
    public class DuraformFileDto : ApplicationFileDto
    {
        public Guid DuraformFormId { get; set; }

        public string Description { get; set; }
    }
}