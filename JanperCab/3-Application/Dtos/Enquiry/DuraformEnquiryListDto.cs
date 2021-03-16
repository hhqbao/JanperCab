using _1_Domain.Enum;
using _3_Application.Dtos.Customer;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace _3_Application.Dtos.Enquiry
{
    public class DuraformEnquiryListDto
    {
        public int Id { get; set; }

        public DuraformProcessEnum Status
        {
            get
            {
                var status = DuraformProcesses.OrderByDescending(x => x.Process).FirstOrDefault(x => x.CompletedDate.HasValue);

                return status?.Process ?? DuraformProcessEnum.Ordered;
            }
        }

        public DateTime CreatedDate { get; set; }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CustomerReference { get; set; }

        public bool IsRoutingOnly { get; set; }

        public CabinetMakerDto CabinetMaker { get; set; }

        public DistributorDto Distributor { get; set; }

        public string DeliveryNote { get; set; }

        public ICollection<DuraformProcessDto> DuraformProcesses { get; set; }



        public DuraformEnquiryListDto()
        {
            DuraformProcesses = new Collection<DuraformProcessDto>();
        }
    }
}