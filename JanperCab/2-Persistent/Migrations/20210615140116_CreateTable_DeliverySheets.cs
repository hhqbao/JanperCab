using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DeliverySheets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliverySheetId",
                table: "Processes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeliverySheets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryMethod = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    DriverId = table.Column<int>(nullable: true),
                    TruckId = table.Column<int>(nullable: true),
                    LockedDate = table.Column<DateTime>(nullable: true),
                    CameBackDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliverySheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliverySheets_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DeliverySheets_Trucks_TruckId",
                        column: x => x.TruckId,
                        principalTable: "Trucks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Processes_DeliverySheetId",
                table: "Processes",
                column: "DeliverySheetId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverySheets_DriverId",
                table: "DeliverySheets",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverySheets_TruckId",
                table: "DeliverySheets",
                column: "TruckId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_DeliverySheets_DeliverySheetId",
                table: "Processes",
                column: "DeliverySheetId",
                principalTable: "DeliverySheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_DeliverySheets_DeliverySheetId",
                table: "Processes");

            migrationBuilder.DropTable(
                name: "DeliverySheets");

            migrationBuilder.DropIndex(
                name: "IX_Processes_DeliverySheetId",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "DeliverySheetId",
                table: "Processes");
        }
    }
}
