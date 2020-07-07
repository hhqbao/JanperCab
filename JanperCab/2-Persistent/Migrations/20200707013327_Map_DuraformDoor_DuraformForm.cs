using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Map_DuraformDoor_DuraformForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DuraformFormId",
                table: "DuraformComponents",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DuraformFormId",
                table: "DuraformComponents");
        }
    }
}
