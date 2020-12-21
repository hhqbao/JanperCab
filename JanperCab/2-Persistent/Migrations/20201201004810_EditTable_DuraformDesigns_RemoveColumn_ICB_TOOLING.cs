using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesigns_RemoveColumn_ICB_TOOLING : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_TOOLING",
                table: "DuraformDesigns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ICB_TOOLING",
                table: "DuraformDesigns",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }
    }
}
