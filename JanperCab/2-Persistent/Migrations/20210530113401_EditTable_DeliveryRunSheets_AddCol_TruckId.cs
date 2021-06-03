using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DeliveryRunSheets_AddCol_TruckId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TruckId",
                table: "DeliveryRunSheets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRunSheets_TruckId",
                table: "DeliveryRunSheets",
                column: "TruckId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryRunSheets_Trucks_TruckId",
                table: "DeliveryRunSheets",
                column: "TruckId",
                principalTable: "Trucks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryRunSheets_Trucks_TruckId",
                table: "DeliveryRunSheets");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryRunSheets_TruckId",
                table: "DeliveryRunSheets");

            migrationBuilder.DropColumn(
                name: "TruckId",
                table: "DeliveryRunSheets");
        }
    }
}
