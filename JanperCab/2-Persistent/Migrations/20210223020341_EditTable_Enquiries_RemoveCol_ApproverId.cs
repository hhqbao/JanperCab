using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_RemoveCol_ApproverId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_AspNetUsers_ApproverId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_ApproverId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ApprovedDate",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ApproverId",
                table: "Enquiries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedDate",
                table: "Enquiries",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApproverId",
                table: "Enquiries",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_ApproverId",
                table: "Enquiries",
                column: "ApproverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_AspNetUsers_ApproverId",
                table: "Enquiries",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
