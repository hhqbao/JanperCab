using _1_Domain;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformOptionRollerShutterFrames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LeftSize",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RightSize",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TopSize",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.Sql($"Insert DuraformOptionTypes(Id, Name) Values(${(int)DuraformOptionType.DuraformOptionTypeKey.RollerShutter}, 'Roller Shutter Frame')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeftSize",
                table: "DuraformOptions");

            migrationBuilder.DropColumn(
                name: "RightSize",
                table: "DuraformOptions");

            migrationBuilder.DropColumn(
                name: "TopSize",
                table: "DuraformOptions");
        }
    }
}
