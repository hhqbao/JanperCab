using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformEdgeProfiles_AddColumn_ICB_EDGE_TOOLING : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ICB_EDGE_TOOLING",
                table: "DuraformEdgeProfiles",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_EDGE_TOOLING",
                table: "DuraformEdgeProfiles");
        }
    }
}
