using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_HingeHoleOptions_LinkHingeHoleStyle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_HingeHoleOptions_HingeHoleStyle",
                table: "HingeHoleOptions",
                column: "HingeHoleStyle");

            migrationBuilder.AddForeignKey(
                name: "FK_HingeHoleOptions_HingeHoleStyles_HingeHoleStyle",
                table: "HingeHoleOptions",
                column: "HingeHoleStyle",
                principalTable: "HingeHoleStyles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HingeHoleOptions_HingeHoleStyles_HingeHoleStyle",
                table: "HingeHoleOptions");

            migrationBuilder.DropIndex(
                name: "IX_HingeHoleOptions_HingeHoleStyle",
                table: "HingeHoleOptions");
        }
    }
}
