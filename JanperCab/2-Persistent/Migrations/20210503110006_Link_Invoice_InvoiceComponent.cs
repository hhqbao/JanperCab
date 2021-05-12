using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Link_Invoice_InvoiceComponent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_InvoiceComponents_InvoiceId",
                table: "InvoiceComponents",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceComponents_Invoices_InvoiceId",
                table: "InvoiceComponents",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceComponents_Invoices_InvoiceId",
                table: "InvoiceComponents");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceComponents_InvoiceId",
                table: "InvoiceComponents");
        }
    }
}
