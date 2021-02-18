using System.Collections.Generic;

namespace _3_Application.Dtos.DuraformPriceGrid
{
    public class DuraformAllPriceModel
    {
        public List<DuraformPriceGridDto> Prices { get; set; }

        public DuraformAllPriceModel()
        {
            Prices = new List<DuraformPriceGridDto>();
        }
    }
}