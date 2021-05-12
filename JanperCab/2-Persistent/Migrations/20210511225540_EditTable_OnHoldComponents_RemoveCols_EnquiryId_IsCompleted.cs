using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_OnHoldComponents_RemoveCols_EnquiryId_IsCompleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnHoldComponents_Enquiries_EnquiryId",
                table: "OnHoldComponents");

            migrationBuilder.DropIndex(
                name: "IX_OnHoldComponents_EnquiryId",
                table: "OnHoldComponents");

            migrationBuilder.DropColumn(
                name: "EnquiryId",
                table: "OnHoldComponents");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "OnHoldComponents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EnquiryId",
                table: "OnHoldComponents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "OnHoldComponents",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_OnHoldComponents_EnquiryId",
                table: "OnHoldComponents",
                column: "EnquiryId");

            migrationBuilder.AddForeignKey(
                name: "FK_OnHoldComponents_Enquiries_EnquiryId",
                table: "OnHoldComponents",
                column: "EnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
