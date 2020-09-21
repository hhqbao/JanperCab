using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace _1_Domain
{
    public class CabinetMaker : Customer
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

        public string SecondPhone { get; set; }

        public string ThirdPhone { get; set; }

        public decimal DeliveryFee { get; set; }


        public virtual Distributor Distributor { get; set; }
        public virtual ICollection<DuraformForm> DuraformForms { get; set; }

        public CabinetMaker()
        {
            CustomerType = CustomerType.CabinetMaker;
            DuraformForms = new Collection<DuraformForm>();
        }
    }
}