using _3_Application.Dtos.Customer;
using _3_Application.Dtos.Process;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _3_Application.Dtos.Enquiry
{
    public class DuraformEnquiryListDto
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CustomerReference { get; set; }

        public bool IsRoutingOnly { get; set; }

        public CustomerDto Customer { get; set; }

        public CustomerDto Manager { get; set; }

        public string DeliveryNote { get; set; }

        public bool HasBeenInvoiced { get; set; }



        public ICollection<DuraformProcessDto> DuraformProcesses { get; set; }



        public DuraformEnquiryListDto()
        {
            DuraformProcesses = new Collection<DuraformProcessDto>();
        }
    }
}