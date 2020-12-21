using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformOptionMicrowaveFrame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BottomSize",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.Sql($"Insert DuraformOptionTypes(Id, Name) Values(${(int)DuraformOptionTypeKey.MicrowaveFrame}, 'Microwave Frame')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BottomSize",
                table: "DuraformOptions");
        }
    }
}
