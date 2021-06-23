using _1_Domain.Enum;
using _3_Application.Dtos.CustomerCategory;
using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.Customer
{
    public abstract class CustomerDto
    {
        public int Id { get; set; }

        public int? ManagerId { get; set; }

        public CustomerType CustomerType { get; set; }

        public int CustomerCategoryId { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string Fax { get; set; }

        public string Note { get; set; }


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



        public decimal DiscountRate { get; set; }

        public decimal DeliveryFee { get; set; }

        public bool IsOnHold { get; set; }


        public CustomerCategoryDto CustomerCategory { get; set; }

        public CustomerDto Manager { get; set; }
    }
}