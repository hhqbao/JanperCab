using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformComponents_AddCols_SubTotal_TotalDiscount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "DuraformMiscComponents",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "DuraformComponents",
                newName: "TotalPrice");

            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "DuraformMiscComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalDiscount",
                table: "DuraformMiscComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalDiscount",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "DuraformMiscComponents");

            migrationBuilder.DropColumn(
                name: "TotalDiscount",
                table: "DuraformMiscComponents");

            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "TotalDiscount",
                table: "DuraformComponents");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "DuraformMiscComponents",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "DuraformComponents",
                newName: "Price");
        }
    }
}
