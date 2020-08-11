using _1_Domain;

namespace _3_Application.Dtos.Customer
{
    public class CabinetMakerDto : CustomerDto
    {
        public int DistributorId { get; set; }

        public string InvoiceTo { get; set; }

        public string InvoiceAddress { get; set; }

        public string InvoiceSuburb { get; set; }

        public string InvoiceState { get; set; }

        public string InvoicePostcode { get; set; }

        public string DeliveryTo { get; set; }

        public string DeliveryAddress { get; set; }

        public string DeliverySuburb { get; set; }

        public string DeliveryState { get; set; }

        public string DeliveryPostcode { get; set; }

        public CabinetMakerDto()
        {
            CustomerType = CustomerType.CabinetMaker;
        }
    }
}