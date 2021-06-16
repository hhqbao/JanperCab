using System;

namespace _3_Application.Dtos.Machine
{
    public class MachineProdutionCurrentProcessDto
    {

        public int ProcessId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int EnquiryId { get; set; }

        public string Description { get; set; }

        public int NumberOfParts { get; set; }

        public MachineProdutionCurrentProcessDto(_1_Domain.Process process)
        {
            ProcessId = process.Id;
            StartTime = process.StartTime;
            EndTime = process.EndTime;
            EnquiryId = process.EnquiryId;
            Description = process.Enquiry.GetDescription();
            NumberOfParts = process.Enquiry.PartCount;
        }

    }
}