using System;
using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.OnHoldComponent
{
    public class OnHoldComponentDto
    {
        public int Id { get; set; }

        public int ProcessId { get; set; }

        public DateTime CreatedDate { get; set; }

        public int Quantity { get; set; }

        [Required]
        public string Description { get; set; }
    }
}