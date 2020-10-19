using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformOptions_Add_FoldingType_Remove_HasDoubleReturn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasDoubleReturn",
                table: "DuraformOptions");

            migrationBuilder.AddColumn<int>(
                name: "FoldingType",
                table: "DuraformOptions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoldingType",
                table: "DuraformOptions");

            migrationBuilder.AddColumn<bool>(
                name: "HasDoubleReturn",
                table: "DuraformOptions",
                type: "bit",
                nullable: true);
        }
    }
}
