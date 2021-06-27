using _1_Domain.Enum;
using _2_Persistent;
using _3_Application.Dtos.Reports;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class ReportRepo : IReportRepo
    {
        private readonly ApplicationDbContext _dbContext;

        public ReportRepo(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<DailyOrderDto>> DailyOrderReportAsync(DateTime chosenDate)
        {
            var enquiries = await _dbContext.Enquiries.Where(x => x.EnquiryType == EnquiryTypeEnum.Order &&
                                                                  x.CreatedDate >= chosenDate &&
                                                                  x.CreatedDate < chosenDate.AddDays(1)).ToListAsync();

            var model = enquiries.Select(x => new DailyOrderDto(x)).OrderBy(x => x.EnquiryId).ToList();

            return model;
        }

        public async Task<MemoryStream> DailyOrderReportExcelAsync(DateTime chosenDate)
        {
            var report = await DailyOrderReportAsync(chosenDate);

            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var sheet = package.Workbook.Worksheets.Add("WorkSheet1");

                var headers = new List<string[]>
                {
                    new []{ "JOB","TYPE","DOOR","COLOUR","DF","JE","RO","FP","CLIENT","ORDER","CREATED AT","INC GST"}
                };
                sheet.Cells["A1:L1"].LoadFromArrays(headers);
                sheet.Cells["A1:L1"].Style.Font.Bold = true;
                sheet.Cells["A1:L1"].Style.Font.Color.SetColor(Color.Blue);

                var index = 2;
                foreach (var item in report)
                {
                    sheet.Cells[$"A{index}"].Value = item.EnquiryId;
                    sheet.Cells[$"B{index}"].Value = item.Type;
                    sheet.Cells[$"C{index}"].Value = item.Door;
                    sheet.Cells[$"D{index}"].Value = item.Colour;
                    sheet.Cells[$"E{index}"].Value = item.DuraformParts;
                    sheet.Cells[$"F{index}"].Value = item.JanperEdgeParts;
                    sheet.Cells[$"G{index}"].Value = item.RouteOnlyParts;
                    sheet.Cells[$"H{index}"].Value = item.FlatpackParts;
                    sheet.Cells[$"I{index}"].Value = item.CustomerName;
                    sheet.Cells[$"J{index}"].Value = item.OrderReference;
                    sheet.Cells[$"K{index}"].Value = item.CreatedDate.ToString("t");
                    sheet.Cells[$"L{index}"].Value = item.TotalPrice.ToString("C");

                    index += 1;
                }

                sheet.Cells[$"E{index}:L{index}"].Style.Font.Bold = true;
                sheet.Cells[$"E{index}:L{index}"].Style.Font.Color.SetColor(Color.Red);

                sheet.Cells[$"E{index}"].Value = report.Sum(x => x.DuraformParts);
                sheet.Cells[$"F{index}"].Value = report.Sum(x => x.JanperEdgeParts);
                sheet.Cells[$"G{index}"].Value = report.Sum(x => x.RouteOnlyParts);
                sheet.Cells[$"H{index}"].Value = report.Sum(x => x.FlatpackParts);
                sheet.Cells[$"L{index}"].Value = report.Sum(x => x.TotalPrice).ToString("C");

                package.Save();
            }

            stream.Position = 0;

            return stream;
        }

        public async Task<List<DailyInvoiceDto>> DailyInvoiceReportAsync(DateTime chosenDate)
        {
            var invoices = await _dbContext.Invoices.Where(x => x.CreatedDate >= chosenDate &&
                                                                x.CreatedDate < chosenDate.AddDays(1)).ToListAsync();

            var model = invoices.Select(x => new DailyInvoiceDto(x)).OrderBy(x => x.EnquiryId).ToList();

            return model;
        }

        public async Task<MemoryStream> DailyInvoiceReportExcelAsync(DateTime chosenDate)
        {
            var report = await DailyInvoiceReportAsync(chosenDate);

            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var sheet = package.Workbook.Worksheets.Add("WorkSheet1");

                var headers = new List<string[]>
                {
                    new []{ "JOB","CLIENT","ORDER NUMBER","JOB TYPE","EX GST AMT","DELIVERY","GST","INC GST","CREATED AT"}
                };
                sheet.Cells["A1:I1"].LoadFromArrays(headers);
                sheet.Cells["A1:I1"].Style.Font.Bold = true;
                sheet.Cells["A1:I1"].Style.Font.Color.SetColor(Color.Blue);

                var index = 2;
                foreach (var item in report)
                {
                    sheet.Cells[$"A{index}"].Value = item.EnquiryId;
                    sheet.Cells[$"B{index}"].Value = item.CustomerName;
                    sheet.Cells[$"C{index}"].Value = item.OrderReference;
                    sheet.Cells[$"D{index}"].Value = item.Type;
                    sheet.Cells[$"E{index}"].Value = item.SubTotal.ToString("C");
                    sheet.Cells[$"F{index}"].Value = item.DeliveryFee.ToString("C");
                    sheet.Cells[$"G{index}"].Value = item.TotalGst.ToString("C");
                    sheet.Cells[$"H{index}"].Value = item.TotalPrice.ToString("C");
                    sheet.Cells[$"I{index}"].Value = item.CreatedDate.ToString("t");

                    index += 1;
                }

                sheet.Cells[$"E{index}:H{index}"].Style.Font.Bold = true;
                sheet.Cells[$"E{index}:H{index}"].Style.Font.Color.SetColor(Color.Red);

                sheet.Cells[$"E{index}"].Value = report.Sum(x => x.SubTotal).ToString("C");
                sheet.Cells[$"F{index}"].Value = report.Sum(x => x.DeliveryFee).ToString("C");
                sheet.Cells[$"G{index}"].Value = report.Sum(x => x.TotalGst).ToString("C");
                sheet.Cells[$"H{index}"].Value = report.Sum(x => x.TotalPrice).ToString("C");


                package.Save();
            }

            stream.Position = 0;

            return stream;
        }

        public async Task<List<MonthlyTallyReportDto>> MonthlyTallyReportAsync(int year, int month)
        {
            var report = new List<MonthlyTallyReportDto>();

            for (var i = 1; i <= DateTime.DaysInMonth(year, month); i++)
            {
                var date = new DateTime(year, month, i);

                var enquiries = await _dbContext.Enquiries.Where(x => x.CreatedDate >= date &&
                                                                      x.CreatedDate < date.AddDays(1)).ToListAsync();

                var invoicedOrders = await _dbContext.Enquiries.Where(x => x.Invoice != null &&
                                                                           x.Invoice.CreatedDate >= date &&
                                                                           x.Invoice.CreatedDate < date.AddDays(1)).ToListAsync();

                report.Add(new MonthlyTallyReportDto(date, enquiries, invoicedOrders));
            }

            return report;
        }

        public async Task<MemoryStream> MonthlyTallyReportExcelAsync(int year, int month)
        {
            var report = await MonthlyTallyReportAsync(year, month);

            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var sheet = package.Workbook.Worksheets.Add("WorkSheet1");

                var headers = new List<string[]>
                {
                    new []{ "DAY","ORD","DF","DF ORD","JE","JE ORD","RO","RO ORD","FP","FP ORD","ORDER $","INV","DF","DF INV","JE","JE INV","RO","RO INV","FP","FP INV","INV $"}
                };
                sheet.Cells["A1:U1"].LoadFromArrays(headers);
                sheet.Cells["A1:U1"].Style.Font.Bold = true;
                sheet.Cells["A1:U1"].Style.Font.Color.SetColor(Color.Blue);

                var index = 2;
                foreach (var item in report)
                {
                    sheet.Cells[$"A{index}"].Value = item.Date.ToString("dd-MMM");
                    sheet.Cells[$"B{index}"].Value = item.OrderCount;
                    sheet.Cells[$"C{index}"].Value = item.OrderedDuraformParts;
                    sheet.Cells[$"D{index}"].Value = item.OrderedDuraformPrice.ToString("C");
                    sheet.Cells[$"E{index}"].Value = item.OrderedJanperEdgeParts;
                    sheet.Cells[$"F{index}"].Value = item.OrderedJanperEdgePrice.ToString("C");
                    sheet.Cells[$"G{index}"].Value = item.OrderedRouteOnlyParts;
                    sheet.Cells[$"H{index}"].Value = item.OrderedRouteOnlyPrice.ToString("C");
                    sheet.Cells[$"I{index}"].Value = item.OrderedFlatpackParts;
                    sheet.Cells[$"J{index}"].Value = item.OrderedFlatpackPrice.ToString("C");
                    sheet.Cells[$"K{index}"].Value = item.TotalOrderedPrice.ToString("C");
                    sheet.Cells[$"L{index}"].Value = item.InvoiceCount;
                    sheet.Cells[$"M{index}"].Value = item.InvoicedDuraformParts;
                    sheet.Cells[$"N{index}"].Value = item.InvoicedDuraformPrice.ToString("C");
                    sheet.Cells[$"O{index}"].Value = item.InvoicedJanperEdgeParts;
                    sheet.Cells[$"P{index}"].Value = item.InvoicedJanperEdgePrice.ToString("C");
                    sheet.Cells[$"Q{index}"].Value = item.InvoicedRouteOnlyParts;
                    sheet.Cells[$"R{index}"].Value = item.InvoicedRouteOnlyPrice.ToString("C");
                    sheet.Cells[$"S{index}"].Value = item.InvoicedFlatpackParts;
                    sheet.Cells[$"T{index}"].Value = item.InvoicedFlatpackPrice.ToString("C");
                    sheet.Cells[$"U{index}"].Value = item.TotalInvoicedPrice.ToString("C");

                    index += 1;
                }

                sheet.Cells[$"A{index}:U{index}"].Style.Font.Bold = true;
                sheet.Cells[$"A{index}:U{index}"].Style.Font.Color.SetColor(Color.Red);

                sheet.Cells[$"B{index}"].Value = report.Sum(x => x.OrderCount);
                sheet.Cells[$"C{index}"].Value = report.Sum(x => x.OrderedDuraformParts);
                sheet.Cells[$"D{index}"].Value = report.Sum(x => x.OrderedDuraformPrice).ToString("C");
                sheet.Cells[$"E{index}"].Value = report.Sum(x => x.OrderedJanperEdgeParts);
                sheet.Cells[$"F{index}"].Value = report.Sum(x => x.OrderedJanperEdgePrice).ToString("C");
                sheet.Cells[$"G{index}"].Value = report.Sum(x => x.OrderedRouteOnlyParts);
                sheet.Cells[$"H{index}"].Value = report.Sum(x => x.OrderedRouteOnlyPrice).ToString("C");
                sheet.Cells[$"I{index}"].Value = report.Sum(x => x.OrderedFlatpackParts);
                sheet.Cells[$"J{index}"].Value = report.Sum(x => x.OrderedFlatpackPrice).ToString("C");
                sheet.Cells[$"K{index}"].Value = report.Sum(x => x.TotalOrderedPrice).ToString("C");
                sheet.Cells[$"L{index}"].Value = report.Sum(x => x.InvoiceCount);
                sheet.Cells[$"M{index}"].Value = report.Sum(x => x.InvoicedDuraformParts);
                sheet.Cells[$"N{index}"].Value = report.Sum(x => x.InvoicedDuraformPrice).ToString("C");
                sheet.Cells[$"O{index}"].Value = report.Sum(x => x.InvoicedJanperEdgeParts);
                sheet.Cells[$"P{index}"].Value = report.Sum(x => x.InvoicedJanperEdgePrice).ToString("C");
                sheet.Cells[$"Q{index}"].Value = report.Sum(x => x.InvoicedRouteOnlyParts);
                sheet.Cells[$"R{index}"].Value = report.Sum(x => x.InvoicedRouteOnlyPrice).ToString("C");
                sheet.Cells[$"S{index}"].Value = report.Sum(x => x.InvoicedFlatpackParts);
                sheet.Cells[$"T{index}"].Value = report.Sum(x => x.InvoicedFlatpackPrice).ToString("C");
                sheet.Cells[$"U{index}"].Value = report.Sum(x => x.TotalInvoicedPrice).ToString("C");

                package.Save();
            }

            stream.Position = 0;

            return stream;
        }
    }
}