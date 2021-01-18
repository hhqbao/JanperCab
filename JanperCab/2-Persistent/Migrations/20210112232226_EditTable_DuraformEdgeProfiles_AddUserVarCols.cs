using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformEdgeProfiles_AddUserVarCols : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserVar1",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar2",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar3",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar4",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar5",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar6",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar7",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserVar8",
                table: "DuraformEdgeProfiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserVar1",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar2",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar3",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar4",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar5",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar6",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar7",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "UserVar8",
                table: "DuraformEdgeProfiles");
        }
    }
}
