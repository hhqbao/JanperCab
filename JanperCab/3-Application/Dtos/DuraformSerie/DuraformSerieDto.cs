using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformSerie
{
    public class DuraformSerieDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DuraformSerieTypeEnum SerieTypeEnum { get; set; }

        public bool IsHidden { get; set; }
    }
}