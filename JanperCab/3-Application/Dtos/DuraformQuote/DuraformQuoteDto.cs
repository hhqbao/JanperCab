using _1_Domain;
using _3_Application.Dtos.DuraformForm;

namespace _3_Application.Dtos.DuraformQuote
{
    public class DuraformQuoteDto : DuraformFormDto
    {
        public int QuoteNumber { get; set; }

        public QuoteStatus QuoteStatus { get; set; }
    }
}