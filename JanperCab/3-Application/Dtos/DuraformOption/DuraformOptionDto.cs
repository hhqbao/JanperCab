namespace _3_Application.Dtos.DuraformOption
{
    public abstract class DuraformOptionDto
    {
        public int Id { get; set; }

        public _1_Domain.DuraformOptionType.DuraformOptionTypeKey DuraformOptionTypeId { get; set; }
    }
}