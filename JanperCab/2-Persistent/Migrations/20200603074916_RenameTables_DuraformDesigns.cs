using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class RenameTables_DuraformDesigns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotAvailableDoorWrapTypes");

            migrationBuilder.DropTable(
                name: "DuraformDoors");

            migrationBuilder.CreateTable(
                name: "DuraformDesigns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(1000)", nullable: true),
                    IsPopular = table.Column<bool>(nullable: false),
                    DuraformSerieId = table.Column<int>(nullable: false),
                    FixedEdgeProfileId = table.Column<int>(nullable: true),
                    DefaultEdgeProfileId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformDesigns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformDesigns_DuraformEdgeProfiles_DefaultEdgeProfileId",
                        column: x => x.DefaultEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformDesigns_DuraformSeries_DuraformSerieId",
                        column: x => x.DuraformSerieId,
                        principalTable: "DuraformSeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformDesigns_DuraformEdgeProfiles_FixedEdgeProfileId",
                        column: x => x.FixedEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NotAvailableDesignWrapTypes",
                columns: table => new
                {
                    DuraformDesignId = table.Column<int>(nullable: false),
                    DuraformWrapTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotAvailableDesignWrapTypes", x => new { x.DuraformDesignId, x.DuraformWrapTypeId });
                    table.ForeignKey(
                        name: "FK_NotAvailableDesignWrapTypes_DuraformDesigns_DuraformDesignId",
                        column: x => x.DuraformDesignId,
                        principalTable: "DuraformDesigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotAvailableDesignWrapTypes_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDesigns_DefaultEdgeProfileId",
                table: "DuraformDesigns",
                column: "DefaultEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDesigns_DuraformSerieId",
                table: "DuraformDesigns",
                column: "DuraformSerieId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDesigns_FixedEdgeProfileId",
                table: "DuraformDesigns",
                column: "FixedEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_NotAvailableDesignWrapTypes_DuraformWrapTypeId",
                table: "NotAvailableDesignWrapTypes",
                column: "DuraformWrapTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotAvailableDesignWrapTypes");

            migrationBuilder.DropTable(
                name: "DuraformDesigns");

            migrationBuilder.CreateTable(
                name: "DuraformDoors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DefaultEdgeProfileId = table.Column<int>(type: "int", nullable: true),
                    DuraformSerieId = table.Column<int>(type: "int", nullable: false),
                    FixedEdgeProfileId = table.Column<int>(type: "int", nullable: true),
                    ImageUrl = table.Column<string>(type: "varchar(1000)", nullable: true),
                    IsPopular = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformDoors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformDoors_DuraformEdgeProfiles_DefaultEdgeProfileId",
                        column: x => x.DefaultEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformDoors_DuraformSeries_DuraformSerieId",
                        column: x => x.DuraformSerieId,
                        principalTable: "DuraformSeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformDoors_DuraformEdgeProfiles_FixedEdgeProfileId",
                        column: x => x.FixedEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NotAvailableDoorWrapTypes",
                columns: table => new
                {
                    DuraformDoorId = table.Column<int>(type: "int", nullable: false),
                    DuraformWrapTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotAvailableDoorWrapTypes", x => new { x.DuraformDoorId, x.DuraformWrapTypeId });
                    table.ForeignKey(
                        name: "FK_NotAvailableDoorWrapTypes_DuraformDoors_DuraformDoorId",
                        column: x => x.DuraformDoorId,
                        principalTable: "DuraformDoors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotAvailableDoorWrapTypes_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_DefaultEdgeProfileId",
                table: "DuraformDoors",
                column: "DefaultEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_DuraformSerieId",
                table: "DuraformDoors",
                column: "DuraformSerieId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_FixedEdgeProfileId",
                table: "DuraformDoors",
                column: "FixedEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_NotAvailableDoorWrapTypes_DuraformWrapTypeId",
                table: "NotAvailableDoorWrapTypes",
                column: "DuraformWrapTypeId");
        }
    }
}
