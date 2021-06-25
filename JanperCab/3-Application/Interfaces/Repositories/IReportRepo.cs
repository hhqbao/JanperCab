using _3_Application.Dtos.Reports;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IReportRepo
    {
        Task<List<DailyOrderDto>> DailyOrderReportAsync(DateTime chosenDate);

        Task<MemoryStream> DailyOrderReportExcelAsync(DateTime chosenDate);
    }
}