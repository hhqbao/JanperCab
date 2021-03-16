using _1_Domain.Enum;
using System;

namespace _1_Domain
{
    public class DuraformProcess
    {
        public int Id { get; set; }

        public int DuraformEnquiryId { get; set; }

        public DuraformProcessEnum Process { get; set; }

        public DateTime? CompletedDate { get; set; }


        public virtual DuraformEnquiry DuraformEnquiry { get; set; }

        public DuraformProcess()
        {

        }

        public DuraformProcess(DuraformProcessEnum process, DateTime? completedDate)
        {
            Process = process;
            CompletedDate = completedDate;
        }
    }
}