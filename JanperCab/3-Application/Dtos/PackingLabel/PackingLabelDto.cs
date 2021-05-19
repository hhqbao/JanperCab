namespace _3_Application.Dtos.PackingLabel
{
    public class PackingLabelDto
    {
        public int EnquiryId { get; set; }

        public string CustomerReference { get; set; }

        public string CustomerName { get; set; }

        public string ManagerName { get; set; }

        public PackingLabelDto(_1_Domain.Enquiry enquiry)
        {
            EnquiryId = enquiry.Id;
            CustomerReference = enquiry.CustomerReference;
            CustomerName = enquiry.Customer.Name;
            ManagerName = enquiry.Manager?.Name;
        }
    }
}