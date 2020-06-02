using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_NotAvailableDoorWrapTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NotAvailableDoorWrapTypes",
                columns: table => new
                {
                    DuraformDoorId = table.Column<int>(nullable: false),
                    DuraformWrapTypeId = table.Column<int>(nullable: false)
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
                name: "IX_NotAvailableDoorWrapTypes_DuraformWrapTypeId",
                table: "NotAvailableDoorWrapTypes",
                column: "DuraformWrapTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotAvailableDoorWrapTypes");
        }
    }
}
