using _3_Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize(Roles = "Manufacturer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ReportsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("daily-orders")]
        public async Task<IActionResult> DailyOrders(DateTime chosenDate)
        {
            return Ok(await _unitOfWork.Reports.DailyOrderReportAsync(chosenDate));
        }

        [HttpGet("excel/daily-orders")]
        public async Task<IActionResult> ExcelDailyOrders(DateTime chosenDate)
        {
            var reportStream = await _unitOfWork.Reports.DailyOrderReportExcelAsync(chosenDate);


            return File(reportStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        [HttpGet("daily-invoices")]
        public async Task<IActionResult> DailyInvoices(DateTime chosenDate)
        {
            return Ok(await _unitOfWork.Reports.DailyInvoiceReportAsync(chosenDate));
        }

        [HttpGet("excel/daily-invoices")]
        public async Task<IActionResult> ExcelDailyInvoices(DateTime chosenDate)
        {
            var reportStream = await _unitOfWork.Reports.DailyInvoiceReportExcelAsync(chosenDate);


            return File(reportStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}
