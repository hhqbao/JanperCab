using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class DropLink_Invoice_InvoiceComponent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceComponents_Invoices_InvoiceId",
                table: "InvoiceComponents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "SubId",
                table: "Invoices");

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "InvoiceComponents",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices");

            migrationBuilder.AddColumn<string>(
                name: "SubId",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceId",
                table: "InvoiceComponents",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invoices",
                table: "Invoices",
                column: "SubId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceComponents_InvoiceId",
                table: "InvoiceComponents",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceComponents_Invoices_InvoiceId",
                table: "InvoiceComponents",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "SubId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
