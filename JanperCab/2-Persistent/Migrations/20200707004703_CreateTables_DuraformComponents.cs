using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTables_DuraformComponents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformComponents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(nullable: false),
                    Height = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Width = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DuraformEdgeProfileId = table.Column<int>(nullable: false),
                    Top = table.Column<bool>(nullable: false),
                    Bottom = table.Column<bool>(nullable: false),
                    Left = table.Column<bool>(nullable: false),
                    Right = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(type: "varchar(1000)", nullable: true),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformComponents_DuraformEdgeProfiles_DuraformEdgeProfileId",
                        column: x => x.DuraformEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DuraformOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    DuraformOptionTypeId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    HasProfile = table.Column<bool>(nullable: true),
                    Length = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Thickness = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    HasDoubleReturn = table.Column<bool>(nullable: true),
                    Columns = table.Column<int>(nullable: true),
                    Rows = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformOptions_DuraformOptionTypes_DuraformOptionTypeId",
                        column: x => x.DuraformOptionTypeId,
                        principalTable: "DuraformOptionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformOptions_DuraformComponents_Id",
                        column: x => x.Id,
                        principalTable: "DuraformComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HingeHoleOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Side = table.Column<string>(type: "varchar(255)", nullable: false),
                    Top = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Bottom = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HingeHoleOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HingeHoleOptions_DuraformComponents_Id",
                        column: x => x.Id,
                        principalTable: "DuraformComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformEdgeProfileId",
                table: "DuraformComponents",
                column: "DuraformEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformOptions_DuraformOptionTypeId",
                table: "DuraformOptions",
                column: "DuraformOptionTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformOptions");

            migrationBuilder.DropTable(
                name: "HingeHoleOptions");

            migrationBuilder.DropTable(
                name: "DuraformComponents");
        }
    }
}
