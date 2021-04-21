using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Invoices_LinkToCabinetMaker : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CabinetMakerId",
                table: "Invoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryPostcode",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryState",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliverySuburb",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryTo",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceAddress",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoicePostcode",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceState",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceSuburb",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceTo",
                table: "Invoices",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CabinetMakerId",
                table: "Invoices",
                column: "CabinetMakerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Customers_CabinetMakerId",
                table: "Invoices",
                column: "CabinetMakerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Customers_CabinetMakerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_CabinetMakerId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "CabinetMakerId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DeliveryPostcode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DeliveryState",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DeliverySuburb",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DeliveryTo",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceAddress",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoicePostcode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceState",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceSuburb",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceTo",
                table: "Invoices");
        }
    }
}
