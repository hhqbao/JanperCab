using System.Collections.Generic;

namespace _3_Application.Dtos.DuraformPriceGrid
{
    public class DuraformAllPriceModel<T>
    {
        public List<T> Prices { get; set; }

        public DuraformAllPriceModel()
        {
            Prices = new List<T>();
        }
    }
}