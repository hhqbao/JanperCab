namespace _3_Application.Dtos.DuraformPriceGrid
{
    public abstract class DuraformPriceGridDto
    {
        public int Id { get; set; }

        public decimal MinHeight { get; set; }

        public decimal MaxHeight { get; set; }

        public decimal MinWidth { get; set; }

        public decimal MaxWidth { get; set; }

        public decimal Price { get; set; }

        public decimal TempPrice => Price;

        public int DuraformSerieId { get; set; }
    }
}