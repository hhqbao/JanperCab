using System;

namespace _3_Application.Dtos.ApplicationFile
{
    public abstract class ApplicationFileDto
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public int FileSize { get; set; }

        public string FileType { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}