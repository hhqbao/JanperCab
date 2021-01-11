using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformDesignEdgeProfiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformDesignEdgeProfiles",
                columns: table => new
                {
                    DuraformDesignId = table.Column<int>(nullable: false),
                    DuraformEdgeProfileId = table.Column<int>(nullable: false),
                    ForceTop = table.Column<bool>(nullable: true),
                    ForceBottom = table.Column<bool>(nullable: true),
                    ForceLeft = table.Column<bool>(nullable: true),
                    ForceRight = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformDesignEdgeProfiles", x => new { x.DuraformDesignId, x.DuraformEdgeProfileId });
                    table.ForeignKey(
                        name: "FK_DuraformDesignEdgeProfiles_DuraformDesigns_DuraformDesignId",
                        column: x => x.DuraformDesignId,
                        principalTable: "DuraformDesigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuraformDesignEdgeProfiles_DuraformEdgeProfiles_DuraformEdgeProfileId",
                        column: x => x.DuraformEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDesignEdgeProfiles_DuraformEdgeProfileId",
                table: "DuraformDesignEdgeProfiles",
                column: "DuraformEdgeProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformDesignEdgeProfiles");
        }
    }
}
