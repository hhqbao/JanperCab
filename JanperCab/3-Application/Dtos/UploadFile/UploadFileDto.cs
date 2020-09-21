using System;
using Microsoft.AspNetCore.Http;

namespace _3_Application.Dtos.UploadFile
{
    public abstract class UploadFileDto
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public int FileSize { get; set; }

        public string FileType { get; set; }

        public IFormFile File { get; set; }
    }
}