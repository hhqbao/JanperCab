﻿namespace _1_Domain
{
    public abstract class DuraformPriceGrid
    {
        public int Id { get; set; }

        public decimal MinHeight { get; set; }

        public decimal MaxHeight { get; set; }

        public decimal MinWidth { get; set; }

        public decimal MaxWidth { get; set; }

        public decimal Price { get; set; }

        public int DuraformSerieId { get; set; }

        public virtual DuraformSerie DuraformSerie { get; set; }
    }
}