﻿using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformMiscHeatStrip : DuraformMiscComponent
    {
        public HeatStripTypeEnum Type { get; set; }

        public HeatStripSizeEnum Size { get; set; }

        public override string GetInvoiceDescription()
        {
            return $"Heat Strip - Type {Type} - {Size}mm";
        }
    }
}