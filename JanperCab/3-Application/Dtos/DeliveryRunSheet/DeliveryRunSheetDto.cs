using System;

namespace _3_Application.Dtos.DeliveryRunSheet
{
    public class DeliveryRunSheetDto
    {
        public int Id { get; set; }

        public int DriverId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? LockedDate { get; set; }
    }
}