using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesign_RemoveCol_FixedEdgeProfileId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDesigns_DuraformEdgeProfiles_FixedEdgeProfileId",
                table: "DuraformDesigns");

            migrationBuilder.DropIndex(
                name: "IX_DuraformDesigns_FixedEdgeProfileId",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "FixedEdgeProfileId",
                table: "DuraformDesigns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FixedEdgeProfileId",
                table: "DuraformDesigns",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDesigns_FixedEdgeProfileId",
                table: "DuraformDesigns",
                column: "FixedEdgeProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDesigns_DuraformEdgeProfiles_FixedEdgeProfileId",
                table: "DuraformDesigns",
                column: "FixedEdgeProfileId",
                principalTable: "DuraformEdgeProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
