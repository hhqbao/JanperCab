using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformSeries_RemoveColumnId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDesigns_DuraformSeries_DuraformSerieId",
                table: "DuraformDesigns");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformForms_DuraformSeries_DuraformSerieId",
                table: "DuraformForms");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DuraformSeries",
                table: "DuraformSeries");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "DuraformSeries");

            migrationBuilder.AddColumn<int>(
                name: "SerieId",
                table: "DuraformSeries",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DuraformSeries",
                table: "DuraformSeries",
                column: "SerieId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDesigns_DuraformSeries_DuraformSerieId",
                table: "DuraformDesigns",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "SerieId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformForms_DuraformSeries_DuraformSerieId",
                table: "DuraformForms",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "SerieId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "SerieId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDesigns_DuraformSeries_DuraformSerieId",
                table: "DuraformDesigns");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformForms_DuraformSeries_DuraformSerieId",
                table: "DuraformForms");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DuraformSeries",
                table: "DuraformSeries");

            migrationBuilder.DropColumn(
                name: "SerieId",
                table: "DuraformSeries");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "DuraformSeries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DuraformSeries",
                table: "DuraformSeries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDesigns_DuraformSeries_DuraformSerieId",
                table: "DuraformDesigns",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformForms_DuraformSeries_DuraformSerieId",
                table: "DuraformForms",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformPriceGrids_DuraformSeries_DuraformSerieId",
                table: "DuraformPriceGrids",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
