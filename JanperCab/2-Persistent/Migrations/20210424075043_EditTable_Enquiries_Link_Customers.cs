using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_Link_Customers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_CustomerId",
                table: "Enquiries",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_ManagerId",
                table: "Enquiries",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Customers_CustomerId",
                table: "Enquiries",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Customers_ManagerId",
                table: "Enquiries",
                column: "ManagerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Customers_CustomerId",
                table: "Enquiries");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Customers_ManagerId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_CustomerId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_ManagerId",
                table: "Enquiries");
        }
    }
}
