using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesigns_AddCols_SPLIT_THICKNESS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "H_SPLIT_THICKNESS",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "V_SPLIT_THICKNESS",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "H_SPLIT_THICKNESS",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "V_SPLIT_THICKNESS",
                table: "DuraformDesigns");
        }
    }
}
