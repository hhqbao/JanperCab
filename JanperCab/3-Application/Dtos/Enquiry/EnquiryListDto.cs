using _3_Application.Dtos.Customer;
using _3_Application.Dtos.Process;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace _3_Application.Dtos.Enquiry
{
    public class EnquiryListDto
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int DaysInSystem
        {
            get
            {
                var dayDifference = (int)DateTime.Today.Subtract(CreatedDate).TotalDays;
                return Enumerable
                    .Range(1, dayDifference)
                    .Select(x => CreatedDate.AddDays(x))
                    .Count(x => x.DayOfWeek != DayOfWeek.Saturday && x.DayOfWeek != DayOfWeek.Sunday);
            }
        }

        public DateTime? LastEditted { get; set; }

        public DateTime? OrderedDate { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public string CustomerReference { get; set; }

        public bool IsRoutingOnly { get; set; }

        public CustomerDto Customer { get; set; }

        public CustomerDto Manager { get; set; }

        public string DeliveryNote { get; set; }

        public bool HasBeenInvoiced { get; set; }



        public ICollection<ProcessDto> Processes { get; set; }



        public EnquiryListDto()
        {
            Processes = new Collection<ProcessDto>();
        }
    }
}