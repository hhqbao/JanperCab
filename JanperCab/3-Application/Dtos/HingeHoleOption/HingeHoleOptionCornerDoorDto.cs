namespace _3_Application.Dtos.HingeHoleOption
{
    public class HingeHoleOptionCornerDoorDto : HingeHoleOptionDto
    {
        public decimal LeftTop { get; set; }

        public decimal LeftBottom { get; set; }

        public decimal RightTop { get; set; }

        public decimal RightBottom { get; set; }
    }
}