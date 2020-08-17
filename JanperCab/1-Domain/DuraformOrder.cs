namespace _1_Domain
{
    public enum OrderStatus
    {
        Pending = 1,
        Viewed = 2,
        Approved = 3,
        Finalized = 4
    }

    public class DuraformOrder : DuraformForm
    {
        public int OrderNumber { get; set; }

        public OrderStatus OrderStatus { get; set; }



        public DuraformOrder()
        {
            OrderType = DuraformOrderType.Order;
        }
    }
}