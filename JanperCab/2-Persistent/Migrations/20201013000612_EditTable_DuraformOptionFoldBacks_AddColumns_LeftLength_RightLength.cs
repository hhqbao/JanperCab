using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformOptionFoldBacks_AddColumns_LeftLength_RightLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LeftLength",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RightLength",
                table: "DuraformOptions",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeftLength",
                table: "DuraformOptions");

            migrationBuilder.DropColumn(
                name: "RightLength",
                table: "DuraformOptions");
        }
    }
}
