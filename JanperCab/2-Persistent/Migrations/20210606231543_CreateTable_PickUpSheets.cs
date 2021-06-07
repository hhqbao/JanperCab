using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_PickUpSheets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PickUpSheetId",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PickUpSheets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false),
                    ReceiverName = table.Column<string>(type: "varchar(500)", nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: false)
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
                name: "IX_Enquiries_PickUpSheetId",
                table: "Enquiries",
                column: "PickUpSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_PickUpSheets_ApplicationUserId",
                table: "PickUpSheets",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PickUpSheets_CustomerId",
                table: "PickUpSheets",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_PickUpSheets_PickUpSheetId",
                table: "Enquiries",
                column: "PickUpSheetId",
                principalTable: "PickUpSheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_PickUpSheets_PickUpSheetId",
                table: "Enquiries");

            migrationBuilder.DropTable(
                name: "PickUpSheets");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_PickUpSheetId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "PickUpSheetId",
                table: "Enquiries");
        }
    }
}
