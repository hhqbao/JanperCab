using _3_Application.Dtos.DeliverySheet;

namespace _3_Application.Dtos.Process
{
    public class ProcessDeliveringDto : ProcessDto
    {
        public int? DeliverySheetId { get; set; }

        public DeliverySheetDto DeliverySheet { get; set; }
    }
}