using _1_Domain.Enum;

namespace _1_Domain
{
    public class ProcessDelivering : Process
    {
        public int? DeliverySheetId { get; set; }

        public virtual DeliverySheet DeliverySheet { get; set; }

        public ProcessDelivering()
        {
            ProcessType = ProcessTypeEnum.Delivering;
        }
    }
}