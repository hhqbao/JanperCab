using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DeliveryRunSheets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryRunSheetId",
                table: "Processes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeliveryRunSheets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DriverId = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryRunSheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryRunSheets_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Processes_DeliveryRunSheetId",
                table: "Processes",
                column: "DeliveryRunSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRunSheets_DriverId",
                table: "DeliveryRunSheets",
                column: "DriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Processes",
                column: "DeliveryRunSheetId",
                principalTable: "DeliveryRunSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Processes");

            migrationBuilder.DropTable(
                name: "DeliveryRunSheets");

            migrationBuilder.DropIndex(
                name: "IX_Processes_DeliveryRunSheetId",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "DeliveryRunSheetId",
                table: "Processes");
        }
    }
}
