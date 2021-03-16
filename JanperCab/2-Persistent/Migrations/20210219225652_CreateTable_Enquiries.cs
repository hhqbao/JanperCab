using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_Enquiries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Enquiries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerReference = table.Column<string>(type: "varchar(500)", nullable: false),
                    EnquiryType = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    LastEditted = table.Column<DateTime>(nullable: true),
                    CreatorId = table.Column<string>(nullable: false),
                    DistributorId = table.Column<int>(nullable: false),
                    CabinetMakerId = table.Column<int>(nullable: false),
                    InvoiceTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceSuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceState = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoicePostcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliverySuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryState = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryPostcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryNote = table.Column<string>(type: "varchar(2000)", nullable: true),
                    NotEditable = table.Column<bool>(nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    DuraformDesignId = table.Column<int>(nullable: true),
                    DuraformSerieId = table.Column<int>(nullable: true),
                    IsRoutingOnly = table.Column<bool>(nullable: true),
                    DuraformWrapTypeId = table.Column<int>(nullable: true),
                    DuraformWrapColorId = table.Column<int>(nullable: true),
                    DuraformEdgeProfileId = table.Column<int>(nullable: true),
                    HingeHoleTypeId = table.Column<int>(nullable: true),
                    DuraformArchId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enquiries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformArches_DuraformArchId",
                        column: x => x.DuraformArchId,
                        principalTable: "DuraformArches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformDesigns_DuraformDesignId",
                        column: x => x.DuraformDesignId,
                        principalTable: "DuraformDesigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformEdgeProfiles_DuraformEdgeProfileId",
                        column: x => x.DuraformEdgeProfileId,
                        principalTable: "DuraformEdgeProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformSeries_DuraformSerieId",
                        column: x => x.DuraformSerieId,
                        principalTable: "DuraformSeries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformWrapColors_DuraformWrapColorId",
                        column: x => x.DuraformWrapColorId,
                        principalTable: "DuraformWrapColors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_DuraformWrapTypes_DuraformWrapTypeId",
                        column: x => x.DuraformWrapTypeId,
                        principalTable: "DuraformWrapTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_HingeHoleTypes_HingeHoleTypeId",
                        column: x => x.HingeHoleTypeId,
                        principalTable: "HingeHoleTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_Customers_CabinetMakerId",
                        column: x => x.CabinetMakerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_AspNetUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Enquiries_Customers_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformArchId",
                table: "Enquiries",
                column: "DuraformArchId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformDesignId",
                table: "Enquiries",
                column: "DuraformDesignId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformEdgeProfileId",
                table: "Enquiries",
                column: "DuraformEdgeProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformSerieId",
                table: "Enquiries",
                column: "DuraformSerieId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformWrapColorId",
                table: "Enquiries",
                column: "DuraformWrapColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DuraformWrapTypeId",
                table: "Enquiries",
                column: "DuraformWrapTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_HingeHoleTypeId",
                table: "Enquiries",
                column: "HingeHoleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_CabinetMakerId",
                table: "Enquiries",
                column: "CabinetMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_CreatorId",
                table: "Enquiries",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DistributorId",
                table: "Enquiries",
                column: "DistributorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Enquiries");
        }
    }
}
