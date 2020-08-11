using _1_Domain;
using _3_Application.Dtos.DuraformOrder;

namespace _3_Application.Dtos.DuraformQuote
{
    public class DuraformQuoteDto : DuraformFormDto
    {
        public int QuoteNumber { get; set; }

        public QuoteStatus QuoteStatus { get; set; }

        public decimal? TotalPrice { get; set; }
    }
}