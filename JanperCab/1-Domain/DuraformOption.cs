namespace _1_Domain
{
    public abstract class DuraformOption
    {
        public int Id { get; set; }

        public _1_Domain.DuraformOptionType.DuraformOptionTypeKey DuraformOptionTypeId { get; set; }



        public virtual DuraformOptionType DuraformOptionType { get; set; }

        public virtual DuraformComponentWithOption DuraformComponentWithOption { get; set; }
    }
}