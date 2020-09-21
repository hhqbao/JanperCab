namespace _1_Domain
{
    public enum OrderStatus
    {
        Submitted = 1,
        DistributorDeclined = 2,
        DistributorApproved = 3,
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