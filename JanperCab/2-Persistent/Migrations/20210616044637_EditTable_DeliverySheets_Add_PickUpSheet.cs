using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DeliverySheets_Add_PickUpSheet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "DeliverySheets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "DeliverySheets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliverySheets_ApplicationUserId",
                table: "DeliverySheets",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverySheets_CustomerId",
                table: "DeliverySheets",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliverySheets_AspNetUsers_ApplicationUserId",
                table: "DeliverySheets",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliverySheets_Customers_CustomerId",
                table: "DeliverySheets",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliverySheets_AspNetUsers_ApplicationUserId",
                table: "DeliverySheets");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliverySheets_Customers_CustomerId",
                table: "DeliverySheets");

            migrationBuilder.DropIndex(
                name: "IX_DeliverySheets_ApplicationUserId",
                table: "DeliverySheets");

            migrationBuilder.DropIndex(
                name: "IX_DeliverySheets_CustomerId",
                table: "DeliverySheets");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "DeliverySheets");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "DeliverySheets");
        }
    }
}
