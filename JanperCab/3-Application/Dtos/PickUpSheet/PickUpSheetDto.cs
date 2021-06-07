using _3_Application.Dtos.Customer;
using System;

namespace _3_Application.Dtos.PickUpSheet
{
    public class PickUpSheetDto
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsCompleted { get; set; }

        public int CustomerId { get; set; }

        public string ApplicationUserId { get; set; }


        public CustomerDto Customer { get; set; }
    }
}