using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class AddDuraformOption_AngledShelf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDoubleSided",
                table: "DuraformOptions",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SideOne",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SideTwo",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.Sql(
                $"Insert DuraformOptionTypes(Id, Name) Values({(int)DuraformOptionTypeKey.AngledShelf}, 'Angled Shelf')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDoubleSided",
                table: "DuraformOptions");

            migrationBuilder.DropColumn(
                name: "SideOne",
                table: "DuraformOptions");

            migrationBuilder.DropColumn(
                name: "SideTwo",
                table: "DuraformOptions");

            migrationBuilder.Sql($"Delete From DuraformOptionTypes Where Id = {(int)DuraformOptionTypeKey.AngledShelf}");
        }
    }
}
