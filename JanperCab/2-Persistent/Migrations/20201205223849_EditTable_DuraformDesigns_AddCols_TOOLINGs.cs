using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesigns_AddCols_TOOLINGs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ICB_GLASS_TOOLING",
                table: "DuraformDesigns",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ICB_TOOLING",
                table: "DuraformDesigns",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_GLASS_TOOLING",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "ICB_TOOLING",
                table: "DuraformDesigns");
        }
    }
}
