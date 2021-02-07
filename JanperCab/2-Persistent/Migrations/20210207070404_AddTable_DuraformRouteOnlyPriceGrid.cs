using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class AddTable_DuraformRouteOnlyPriceGrid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformWrapTypes_DuraformWrapTypeId",
                table: "DuraformPriceGrids");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformPriceGrids_DuraformSerieId1",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId1",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformWrapTypes_DuraformWrapTypeId",
                table: "DuraformPriceGrids",
                column: "DuraformWrapTypeId",
                principalTable: "DuraformWrapTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId1",
                table: "DuraformPriceGrids");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformWrapTypes_DuraformWrapTypeId",
                table: "DuraformPriceGrids");

            migrationBuilder.DropIndex(
                name: "IX_DuraformPriceGrids_DuraformSerieId1",
                table: "DuraformPriceGrids");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformWrapTypes_DuraformWrapTypeId",
                table: "DuraformPriceGrids",
                column: "DuraformWrapTypeId",
                principalTable: "DuraformWrapTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
