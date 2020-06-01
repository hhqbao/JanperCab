using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformSeries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DuraformSerieId",
                table: "DuraformDoors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DuraformSeries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformSeries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformDoors_DuraformSerieId",
                table: "DuraformDoors",
                column: "DuraformSerieId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformDoors_DuraformSeries_DuraformSerieId",
                table: "DuraformDoors",
                column: "DuraformSerieId",
                principalTable: "DuraformSeries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformDoors_DuraformSeries_DuraformSerieId",
                table: "DuraformDoors");

            migrationBuilder.DropTable(
                name: "DuraformSeries");

            migrationBuilder.DropIndex(
                name: "IX_DuraformDoors_DuraformSerieId",
                table: "DuraformDoors");

            migrationBuilder.DropColumn(
                name: "DuraformSerieId",
                table: "DuraformDoors");
        }
    }
}
