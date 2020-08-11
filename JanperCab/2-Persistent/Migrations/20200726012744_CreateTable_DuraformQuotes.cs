using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformQuotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuoteNumber",
                table: "DuraformForms",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuoteStatus",
                table: "DuraformForms",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "DuraformForms",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuoteNumber",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "QuoteStatus",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "DuraformForms");
        }
    }
}
