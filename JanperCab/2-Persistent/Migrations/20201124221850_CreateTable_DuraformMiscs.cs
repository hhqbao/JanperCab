using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformMiscs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformMiscs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DuraformFormId = table.Column<Guid>(nullable: false),
                    SortNumber = table.Column<int>(nullable: false),
                    MiscItemId = table.Column<int>(nullable: false),
                    Note = table.Column<string>(type: "varchar(500)", nullable: true)
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformMiscs");
        }
    }
}
