using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDrafts_RemoveColumn_DraftId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DraftId",
                table: "DuraformForms");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "DuraformForms",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "DuraformForms",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<Guid>(
                name: "DraftId",
                table: "DuraformForms",
                type: "uniqueidentifier",
                nullable: true);
        }
    }
}
