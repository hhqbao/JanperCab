namespace _3_Application.Dtos.DuraformOption
{
    public class DuraformOptionAngledShelfDto : DuraformOptionDto
    {
        public decimal SideOne { get; set; }

        public decimal SideTwo { get; set; }

        public bool IsDoubleSided { get; set; }
    }
}