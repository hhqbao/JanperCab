using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformEdgeProfiles_AddCols_HideInSections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HideInDoor",
                table: "DuraformEdgeProfiles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HideInDrawer",
                table: "DuraformEdgeProfiles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HideInPanel",
                table: "DuraformEdgeProfiles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HideInPantry",
                table: "DuraformEdgeProfiles",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HideInDoor",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "HideInDrawer",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "HideInPanel",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "HideInPantry",
                table: "DuraformEdgeProfiles");
        }
    }
}
