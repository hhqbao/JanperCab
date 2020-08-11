using _1_Domain;
using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.Customer
{
    public abstract class CustomerDto
    {
        public int Id { get; set; }

        public CustomerType CustomerType { get; set; }

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
    }
}