using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class AddData_DuraformSeries_PlainPanel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                $"Insert DuraformSeries(Name,SerieTypeEnum,IsHidden) Values('Plain Panel', {(int)DuraformSerieTypeEnum.PlainPanel}, 1)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                $"Delete From DuraformSeries Where SerieTypeEnum = {(int)DuraformSerieTypeEnum.PlainPanel}");
        }
    }
}
