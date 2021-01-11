namespace _1_Domain
{
    public class DuraformDesignEdgeProfile
    {
        public int DuraformDesignId { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public virtual DuraformDesign DuraformDesign { get; set; }

        public virtual DuraformEdgeProfile DuraformEdgeProfile { get; set; }
    }
}