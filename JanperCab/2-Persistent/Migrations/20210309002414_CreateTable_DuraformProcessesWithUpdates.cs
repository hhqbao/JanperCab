using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformProcessesWithUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformProcesses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DuraformEnquiryId = table.Column<int>(nullable: false),
                    Process = table.Column<int>(nullable: false),
                    CompletedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformProcesses_Enquiries_DuraformEnquiryId",
                        column: x => x.DuraformEnquiryId,
                        principalTable: "Enquiries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformProcesses_DuraformEnquiryId",
                table: "DuraformProcesses",
                column: "DuraformEnquiryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformProcesses");
        }
    }
}
