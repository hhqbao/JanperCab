using _1_Domain.Enum;
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

        Task<List<DailyInvoiceDto>> DailyInvoiceReportAsync(DateTime chosenDate);

        Task<MemoryStream> DailyInvoiceReportExcelAsync(DateTime chosenDate);

        Task<List<MonthlyTallyReportDto>> MonthlyTallyReportAsync(int year, int month);

        Task<MemoryStream> MonthlyTallyReportExcelAsync(int year, int month);

        Task<List<DailyProductionReportDto>> DailyProductionReportAsync(ProcessTypeEnum stage);

        MemoryStream DailyProductionReportExcel(List<DailyProductionReportDto> productionReport);
    }
}