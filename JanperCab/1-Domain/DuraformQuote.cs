namespace _1_Domain
{
    public enum QuoteStatus
    {
        Pending = 1,
        Viewed = 2,
        Finalized = 3
    }

    public class DuraformQuote : DuraformForm
    {
        public int QuoteNumber { get; set; }

        public QuoteStatus QuoteStatus { get; set; }



        public DuraformQuote()
        {
            OrderType = DuraformOrderType.Quote;
        }
    }
}