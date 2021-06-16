using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DeliverySheets_AddCol_CompletedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CameBackDate",
                table: "DeliverySheets");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "DeliverySheets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "DeliverySheets");

            migrationBuilder.AddColumn<DateTime>(
                name: "CameBackDate",
                table: "DeliverySheets",
                type: "datetime2",
                nullable: true);
        }
    }
}
