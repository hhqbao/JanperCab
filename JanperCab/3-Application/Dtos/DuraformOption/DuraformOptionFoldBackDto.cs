namespace _3_Application.Dtos.DuraformOption
{
    public class DuraformOptionFoldBackDto : DuraformOptionDto
    {
        public bool HasProfile { get; set; }

        public decimal Length { get; set; }

        public decimal Thickness { get; set; }

        public bool HasDoubleReturn { get; set; }
    }
}