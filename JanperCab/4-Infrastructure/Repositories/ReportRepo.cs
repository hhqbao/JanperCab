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

                for (var i = 0; i < report.Count; i++)
                {
                    var item = report[i];

                    sheet.Cells[$"A{i + 2}"].Value = item.EnquiryId;
                    sheet.Cells[$"B{i + 2}"].Value = item.Type;
                    sheet.Cells[$"C{i + 2}"].Value = item.Door;
                    sheet.Cells[$"D{i + 2}"].Value = item.Colour;
                    sheet.Cells[$"E{i + 2}"].Value = item.DuraformParts;
                    sheet.Cells[$"F{i + 2}"].Value = item.JanperEdgeParts;
                    sheet.Cells[$"G{i + 2}"].Value = item.RouteOnlyParts;
                    sheet.Cells[$"H{i + 2}"].Value = item.FlatpackParts;
                    sheet.Cells[$"I{i + 2}"].Value = item.CustomerName;
                    sheet.Cells[$"J{i + 2}"].Value = item.OrderReference;
                    sheet.Cells[$"K{i + 2}"].Value = item.CreatedDate.ToString("t");
                    sheet.Cells[$"L{i + 2}"].Value = item.TotalPrice.ToString("C");
                }

                package.Save();
            }

            stream.Position = 0;

            return stream;
        }
    }
}