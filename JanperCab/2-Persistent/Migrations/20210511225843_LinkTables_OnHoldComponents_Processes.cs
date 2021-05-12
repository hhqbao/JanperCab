using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class LinkTables_OnHoldComponents_Processes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProcessId",
                table: "OnHoldComponents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OnHoldComponents_ProcessId",
                table: "OnHoldComponents",
                column: "ProcessId");

            migrationBuilder.AddForeignKey(
                name: "FK_OnHoldComponents_Processes_ProcessId",
                table: "OnHoldComponents",
                column: "ProcessId",
                principalTable: "Processes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnHoldComponents_Processes_ProcessId",
                table: "OnHoldComponents");

            migrationBuilder.DropIndex(
                name: "IX_OnHoldComponents_ProcessId",
                table: "OnHoldComponents");

            migrationBuilder.DropColumn(
                name: "ProcessId",
                table: "OnHoldComponents");
        }
    }
}
