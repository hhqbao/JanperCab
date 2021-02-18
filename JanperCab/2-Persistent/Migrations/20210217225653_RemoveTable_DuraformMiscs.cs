using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class RemoveTable_DuraformMiscs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformMiscs");

            migrationBuilder.DropTable(
                name: "MiscItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MiscItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MiscItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DuraformMiscs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DuraformFormId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MiscItemId = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "varchar(500)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    SortNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformMiscs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformMiscs_DuraformForms_DuraformFormId",
                        column: x => x.DuraformFormId,
                        principalTable: "DuraformForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuraformMiscs_MiscItems_MiscItemId",
                        column: x => x.MiscItemId,
                        principalTable: "MiscItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformMiscs_DuraformFormId",
                table: "DuraformMiscs",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformMiscs_MiscItemId",
                table: "DuraformMiscs",
                column: "MiscItemId");
        }
    }
}
