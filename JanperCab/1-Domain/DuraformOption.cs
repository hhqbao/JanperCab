using _1_Domain.Enum;

namespace _1_Domain
{
    public abstract class DuraformOption
    {
        public int Id { get; set; }

        public DuraformOptionTypeKey DuraformOptionTypeId { get; set; }

        public abstract void UpdateIcbLineStructure(DuraformComponent component, ICBLineStructure line);



        public virtual DuraformOptionType DuraformOptionType { get; set; }

        public virtual DuraformComponentWithOption DuraformComponentWithOption { get; set; }
    }
}