using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace _2_Persistent.Migrations
{
    public partial class Remove_DeliveryProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Enquiries");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_PickUpSheets_PickUpSheetId",
                table: "Enquiries");

            migrationBuilder.DropTable(
                name: "DeliveryRunSheets");

            migrationBuilder.DropTable(
                name: "PickUpSheets");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_PickUpSheetId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "DuraformProcessType",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "DeliveryRunSheetId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "PickUpSheetId",
                table: "Enquiries");

            migrationBuilder.AddColumn<int>(
                name: "ProcessType",
                table: "Processes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcessType",
                table: "Processes");

            migrationBuilder.AddColumn<int>(
                name: "DuraformProcessType",
                table: "Processes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeliveryRunSheetId",
                table: "Enquiries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PickUpSheetId",
                table: "Enquiries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeliveryRunSheets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveredDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DriverId = table.Column<int>(type: "int", nullable: false),
                    LockedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TruckId = table.Column<int>(type: "int", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_DeliveryRunSheets_Trucks_TruckId",
                        column: x => x.TruckId,
                        principalTable: "Trucks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PickUpSheets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickUpSheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PickUpSheets_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PickUpSheets_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DeliveryRunSheetId",
                table: "Enquiries",
                column: "DeliveryRunSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_PickUpSheetId",
                table: "Enquiries",
                column: "PickUpSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRunSheets_DriverId",
                table: "DeliveryRunSheets",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryRunSheets_TruckId",
                table: "DeliveryRunSheets",
                column: "TruckId");

            migrationBuilder.CreateIndex(
                name: "IX_PickUpSheets_ApplicationUserId",
                table: "PickUpSheets",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PickUpSheets_CustomerId",
                table: "PickUpSheets",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_DeliveryRunSheets_DeliveryRunSheetId",
                table: "Enquiries",
                column: "DeliveryRunSheetId",
                principalTable: "DeliveryRunSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_PickUpSheets_PickUpSheetId",
                table: "Enquiries",
                column: "PickUpSheetId",
                principalTable: "PickUpSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
