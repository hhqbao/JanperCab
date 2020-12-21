using _1_Domain.Enum;

namespace _3_Application.Dtos.DuraformOption
{
    public abstract class DuraformOptionDto
    {
        public int Id { get; set; }

        public DuraformOptionTypeKey DuraformOptionTypeId { get; set; }
    }
}