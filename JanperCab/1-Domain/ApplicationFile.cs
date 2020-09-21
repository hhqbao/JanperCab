using System;

namespace _1_Domain
{
    public abstract class ApplicationFile
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public int FileSize { get; set; }

        public string FileType { get; set; }

        public DateTime CreatedDate { get; set; }

        protected ApplicationFile()
        {
            CreatedDate = DateTime.Now;
        }
    }
}