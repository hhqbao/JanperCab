using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiry_AddCol_DiscountRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountRate",
                table: "InvoiceComponents");

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountRate",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountRate",
                table: "Enquiries",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountRate",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DiscountRate",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "DuraformComponents");

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountRate",
                table: "InvoiceComponents",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
