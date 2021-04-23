using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Invoices_AddCol_DistributorId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Invoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_DistributorId",
                table: "Invoices",
                column: "DistributorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Customers_DistributorId",
                table: "Invoices",
                column: "DistributorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Customers_DistributorId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_DistributorId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Invoices");
        }
    }
}
