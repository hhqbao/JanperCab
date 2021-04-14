using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class RemoveLink_DuraformProcessDelivering_DeliveryRunSheet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Processes");

            migrationBuilder.DropIndex(
                name: "IX_Processes_DeliveryRunSheetId",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "DeliveryRunSheetId",
                table: "Processes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryRunSheetId",
                table: "Processes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Processes_DeliveryRunSheetId",
                table: "Processes",
                column: "DeliveryRunSheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Processes",
                column: "DeliveryRunSheetId",
                principalTable: "DeliveryRunSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
