using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_HingeHoleOption_AddColumns_Quantity_TopCenter_BottomCenter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BottomCenter",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "HingeHoleOptions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "TopCenter",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BottomCenter",
                table: "HingeHoleOptions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "HingeHoleOptions");

            migrationBuilder.DropColumn(
                name: "TopCenter",
                table: "HingeHoleOptions");
        }
    }
}
