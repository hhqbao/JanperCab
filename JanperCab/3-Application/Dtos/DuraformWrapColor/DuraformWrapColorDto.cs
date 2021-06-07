namespace _3_Application.Dtos.DuraformWrapColor
{
    public class DuraformWrapColorDto
    {
        public int Id { get; set; }

        public int DuraformWrapTypeId { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsJanperMatching { get; set; }

        public bool IsLaminexMatching { get; set; }
    }
}