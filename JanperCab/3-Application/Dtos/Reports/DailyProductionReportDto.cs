using _1_Domain;
using _1_Domain.Enum;
using System;
using System.Linq;

namespace _3_Application.Dtos.Reports
{
    public class DailyProductionReportDto
    {
        public int EnquiryId { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Type { get; set; }

        public string Door { get; set; }

        public string Colour { get; set; }

        public int PartCount { get; set; }

        public string CustomerName { get; set; }

        public string CustomerReference { get; set; }

        public ProcessTypeEnum Status { get; set; }

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

        public DailyProductionReportDto(_1_Domain.Enquiry x)
        {
            EnquiryId = x.Id;
            CreatedDate = x.CreatedDate;
            Type = x.JobType;
            Door = x.DoorType;
            Colour = x.DoorColor;
            PartCount = x.PartCount;
            CustomerName = x.Customer.Name;
            CustomerReference = x.CustomerReference;

            switch (x.CurrentProcess)
            {
                case null:
                    Status = ProcessTypeEnum.Ordered;
                    break;
                case ProcessPreRoute preRoute:
                    Status = ProcessTypeEnum.PreRoute;
                    break;
                case ProcessRouting routing:
                    Status = routing.EndTime.HasValue ? ProcessTypeEnum.Routed : ProcessTypeEnum.Routing;
                    break;
                case ProcessPressing pressing:
                    Status = pressing.EndTime.HasValue ? ProcessTypeEnum.Pressed : ProcessTypeEnum.Pressing;
                    break;
                case ProcessCleaning cleaning:
                    Status = cleaning.EndTime.HasValue ? ProcessTypeEnum.Cleaned : ProcessTypeEnum.Cleaning;
                    break;
                case ProcessPacking packing:
                    Status = packing.EndTime.HasValue ? ProcessTypeEnum.Packed : ProcessTypeEnum.Packing;
                    break;
                case ProcessDelivering delivering:
                    if (delivering.EndTime.HasValue)
                    {
                        Status = delivering.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.Shipping ? ProcessTypeEnum.Delivered : ProcessTypeEnum.PickedUp;
                    }
                    else
                    {
                        Status = delivering.DeliverySheet.DeliveryMethod == DeliveryMethodEnum.Shipping ? ProcessTypeEnum.Delivering : ProcessTypeEnum.PickingUp;
                    }
                    break;
            }
        }
    }
}