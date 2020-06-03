using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformEdgeProfiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DefaultEdgeProfileId",
                table: "DuraformDoors",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FixedEdgeProfileId",
                table: "DuraformDoors",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DuraformEdgeProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(1000)", nullable: false),
                    ForcedValuePerItem = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformEdgeProfiles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_DefaultEdgeProfileId",
                table: "DuraformDoors",
                column: "DefaultEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_FixedEdgeProfileId",
                table: "DuraformDoors",
                column: "FixedEdgeProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDoors_DuraformEdgeProfiles_DefaultEdgeProfileId",
                table: "DuraformDoors",
                column: "DefaultEdgeProfileId",
                principalTable: "DuraformEdgeProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDoors_DuraformEdgeProfiles_FixedEdgeProfileId",
                table: "DuraformDoors",
                column: "FixedEdgeProfileId",
                principalTable: "DuraformEdgeProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDoors_DuraformEdgeProfiles_DefaultEdgeProfileId",
                table: "DuraformDoors");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDoors_DuraformEdgeProfiles_FixedEdgeProfileId",
                table: "DuraformDoors");

            migrationBuilder.DropTable(
                name: "DuraformEdgeProfiles");

            migrationBuilder.DropIndex(
                name: "IX_DuraformDoors_DefaultEdgeProfileId",
                table: "DuraformDoors");

            migrationBuilder.DropIndex(
                name: "IX_DuraformDoors_FixedEdgeProfileId",
                table: "DuraformDoors");

            migrationBuilder.DropColumn(
                name: "DefaultEdgeProfileId",
                table: "DuraformDoors");

            migrationBuilder.DropColumn(
                name: "FixedEdgeProfileId",
                table: "DuraformDoors");
        }
    }
}
