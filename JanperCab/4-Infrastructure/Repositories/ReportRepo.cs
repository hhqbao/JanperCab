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
    }
}