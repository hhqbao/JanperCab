﻿namespace _1_Domain
{
    public class DuraformWrapColor
    {
        public int Id { get; set; }

        public int DuraformWrapTypeId { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public bool IsJanperMatching { get; set; }

        public bool IsLaminexMatching { get; set; }


        public virtual DuraformWrapType DuraformWrapType { get; set; }
    }
}