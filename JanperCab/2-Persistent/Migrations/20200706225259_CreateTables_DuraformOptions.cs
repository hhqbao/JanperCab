using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTables_DuraformOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformOptions_DuraformOptionTypeId",
                table: "DuraformOptions",
                column: "DuraformOptionTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformOptions");
        }
    }
}
