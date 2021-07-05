using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Edit_HingeHoleOption_Add_CornerDoor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LeftBottom",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LeftTop",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RightBottom",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RightTop",
                table: "HingeHoleOptions",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeftBottom",
                table: "HingeHoleOptions");

            migrationBuilder.DropColumn(
                name: "LeftTop",
                table: "HingeHoleOptions");

            migrationBuilder.DropColumn(
                name: "RightBottom",
                table: "HingeHoleOptions");

            migrationBuilder.DropColumn(
                name: "RightTop",
                table: "HingeHoleOptions");
        }
    }
}
