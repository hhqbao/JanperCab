﻿namespace _3_Application.Dtos.DuraformComponent
{
    public class DuraformComponentDto
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public decimal Height { get; set; }

        public decimal Width { get; set; }

        public int DuraformEdgeProfileId { get; set; }

        public bool Top { get; set; }

        public bool Bottom { get; set; }

        public bool Left { get; set; }

        public bool Right { get; set; }

        public string Note { get; set; }
    }
}