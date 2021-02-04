using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformDraft : DuraformForm
    {
        public DuraformDraft()
        {
            OrderType = DuraformOrderType.Draft;
        }
    }
}