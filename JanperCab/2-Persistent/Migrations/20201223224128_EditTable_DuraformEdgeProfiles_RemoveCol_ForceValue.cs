using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformEdgeProfiles_RemoveCol_ForceValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForcedValuePerItem",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceBottom",
                table: "DuraformDesignEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceLeft",
                table: "DuraformDesignEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceRight",
                table: "DuraformDesignEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceTop",
                table: "DuraformDesignEdgeProfiles");

            migrationBuilder.AddColumn<bool>(
                name: "ForceBottom",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceLeft",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceRight",
                table: "DuraformEdgeProfiles",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceTop",
                table: "DuraformEdgeProfiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForceBottom",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceLeft",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceRight",
                table: "DuraformEdgeProfiles");

            migrationBuilder.DropColumn(
                name: "ForceTop",
                table: "DuraformEdgeProfiles");

            migrationBuilder.AddColumn<bool>(
                name: "ForcedValuePerItem",
                table: "DuraformEdgeProfiles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceBottom",
                table: "DuraformDesignEdgeProfiles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceLeft",
                table: "DuraformDesignEdgeProfiles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceRight",
                table: "DuraformDesignEdgeProfiles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ForceTop",
                table: "DuraformDesignEdgeProfiles",
                type: "bit",
                nullable: true);
        }
    }
}
