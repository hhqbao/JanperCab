using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformMiscPrices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformMiscPrices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    DuraformWrapTypeId = table.Column<int>(nullable: true),
                    HeatStripSize = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformMiscPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformMiscPrices_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformMiscPrices_DuraformWrapTypeId",
                table: "DuraformMiscPrices",
                column: "DuraformWrapTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformMiscPrices");
        }
    }
}
