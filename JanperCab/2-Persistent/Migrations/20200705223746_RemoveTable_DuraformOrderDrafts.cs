using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace _2_Persistent.Migrations
{
    public partial class RemoveTable_DuraformOrderDrafts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformOrderDrafts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformOrderDrafts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "varchar(1000)", nullable: false),
                    JsonValue = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformOrderDrafts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformOrderDrafts_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformOrderDrafts_ApplicationUserId",
                table: "DuraformOrderDrafts",
                column: "ApplicationUserId");
        }
    }
}
