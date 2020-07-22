using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformForms_AddInvoiceDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryPostcode",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryState",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliverySuburb",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryTo",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceAddress",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoicePostcode",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceState",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceSuburb",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceTo",
                table: "DuraformForms",
                type: "varchar(255)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "DeliveryPostcode",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "DeliveryState",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "DeliverySuburb",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "DeliveryTo",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "InvoiceAddress",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "InvoicePostcode",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "InvoiceState",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "InvoiceSuburb",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "InvoiceTo",
                table: "DuraformForms");
        }
    }
}
