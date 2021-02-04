using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformPriceGrids : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformPriceGrids",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DuraformSerieId = table.Column<int>(nullable: false),
                    DuraformWrapTypeId = table.Column<int>(nullable: false),
                    MinHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaxHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MinWidth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaxWidth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformPriceGrids", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                        column: x => x.DuraformSerieId,
                        principalTable: "DuraformSeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuraformPriceGrids_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformPriceGrids_DuraformSerieId",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformPriceGrids_DuraformWrapTypeId",
                table: "DuraformPriceGrids",
                column: "DuraformWrapTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformPriceGrids");
        }
    }
}
