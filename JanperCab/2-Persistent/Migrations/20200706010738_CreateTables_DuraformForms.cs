using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTables_DuraformForms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OrderType = table.Column<int>(nullable: false),
                    CustomerOrderNumber = table.Column<string>(type: "varchar(500)", nullable: false),
                    DuraformDesignId = table.Column<int>(nullable: false),
                    DuraformSerieId = table.Column<int>(nullable: false),
                    IsRoutingOnly = table.Column<bool>(nullable: false),
                    DuraformWrapTypeId = table.Column<int>(nullable: true),
                    DuraformWrapColorId = table.Column<int>(nullable: true),
                    DuraformEdgeProfileId = table.Column<int>(nullable: false),
                    HingeHoleTypeId = table.Column<int>(nullable: true),
                    DuraformArchId = table.Column<int>(nullable: true),
                    CreatedByUserId = table.Column<string>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    DraftId = table.Column<Guid>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    LastUpdated = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformForms_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformArches_DuraformArchId",
                        column: x => x.DuraformArchId,
                        principalTable: "DuraformArches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformDesigns_DuraformDesignId",
                        column: x => x.DuraformDesignId,
                        principalTable: "DuraformDesigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformEdgeProfiles_DuraformEdgeProfileId",
                        column: x => x.DuraformEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformSeries_DuraformSerieId",
                        column: x => x.DuraformSerieId,
                        principalTable: "DuraformSeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformWrapColors_DuraformWrapColorId",
                        column: x => x.DuraformWrapColorId,
                        principalTable: "DuraformWrapColors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_HingeHoleTypes_HingeHoleTypeId",
                        column: x => x.HingeHoleTypeId,
                        principalTable: "HingeHoleTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_CreatedByUserId",
                table: "DuraformForms",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformArchId",
                table: "DuraformForms",
                column: "DuraformArchId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformDesignId",
                table: "DuraformForms",
                column: "DuraformDesignId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformEdgeProfileId",
                table: "DuraformForms",
                column: "DuraformEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformSerieId",
                table: "DuraformForms",
                column: "DuraformSerieId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformWrapColorId",
                table: "DuraformForms",
                column: "DuraformWrapColorId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DuraformWrapTypeId",
                table: "DuraformForms",
                column: "DuraformWrapTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_HingeHoleTypeId",
                table: "DuraformForms",
                column: "HingeHoleTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformForms");
        }
    }
}
