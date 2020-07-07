using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class RemoveTable_DuraformOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformOptions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DuraformOptionTypeId = table.Column<int>(type: "int", nullable: false),
                    HasProfile = table.Column<bool>(type: "bit", nullable: true),
                    HasDoubleReturn = table.Column<bool>(type: "bit", nullable: true),
                    Length = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Thickness = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Columns = table.Column<int>(type: "int", nullable: true),
                    Rows = table.Column<int>(type: "int", nullable: true)
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
    }
}
