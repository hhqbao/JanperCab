using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateLink_Enquiry_DeliveryRunSheet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryRunSheetId",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DeliveryRunSheetId",
                table: "Enquiries",
                column: "DeliveryRunSheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Enquiries",
                column: "DeliveryRunSheetId",
                principalTable: "DeliveryRunSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_DeliveryRunSheetId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "DeliveryRunSheetId",
                table: "Enquiries");
        }
    }
}
