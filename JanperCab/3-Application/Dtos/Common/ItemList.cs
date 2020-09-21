using System.Collections.Generic;

namespace _3_Application.Dtos.Common
{
    public class ItemList<T> where T : class
    {
        public List<T> Items { get; set; }

        public int TotalItemCount { get; set; }

        public ItemList()
        {
            Items = new List<T>();
        }
    }
}