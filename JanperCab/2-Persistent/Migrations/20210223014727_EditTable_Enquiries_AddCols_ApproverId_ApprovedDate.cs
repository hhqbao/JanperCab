using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_AddCols_ApproverId_ApprovedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationFiles_DuraformForms_DuraformFormId",
                table: "ApplicationFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropTable(
                name: "DuraformForms");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_ApplicationFiles_DuraformFormId",
                table: "ApplicationFiles");

            migrationBuilder.DropColumn(
                name: "DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DuraformFormId",
                table: "ApplicationFiles");

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedDate",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApproverId",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_ApproverId",
                table: "Enquiries",
                column: "ApproverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_AspNetUsers_ApproverId",
                table: "Enquiries",
                column: "ApproverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_AspNetUsers_ApproverId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_ApproverId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ApprovedDate",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ApproverId",
                table: "Enquiries");

            migrationBuilder.AddColumn<Guid>(
                name: "DuraformFormId",
                table: "DuraformComponents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DuraformFormId",
                table: "ApplicationFiles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DuraformForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CabinetMakerId = table.Column<int>(type: "int", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerOrderNumber = table.Column<string>(type: "varchar(500)", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryNote = table.Column<string>(type: "varchar(2000)", nullable: true),
                    DeliveryPostcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryState = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliverySuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DistributorId = table.Column<int>(type: "int", nullable: false),
                    DuraformArchId = table.Column<int>(type: "int", nullable: true),
                    DuraformDesignId = table.Column<int>(type: "int", nullable: false),
                    DuraformEdgeProfileId = table.Column<int>(type: "int", nullable: false),
                    DuraformSerieId = table.Column<int>(type: "int", nullable: false),
                    DuraformWrapColorId = table.Column<int>(type: "int", nullable: true),
                    DuraformWrapTypeId = table.Column<int>(type: "int", nullable: true),
                    HingeHoleTypeId = table.Column<int>(type: "int", nullable: true),
                    InvoiceAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoicePostcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceState = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceSuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    IsRoutingOnly = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NotEditable = table.Column<bool>(type: "bit", nullable: false),
                    OrderType = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: true),
                    OrderStatus = table.Column<int>(type: "int", nullable: true),
                    QuoteNumber = table.Column<int>(type: "int", nullable: true),
                    QuoteStatus = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuraformForms_Customers_CabinetMakerId",
                        column: x => x.CabinetMakerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DuraformForms_Customers_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Customers",
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
                name: "IX_DuraformComponents_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationFiles_DuraformFormId",
                table: "ApplicationFiles",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_CabinetMakerId",
                table: "DuraformForms",
                column: "CabinetMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_CreatedByUserId",
                table: "DuraformForms",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DistributorId",
                table: "DuraformForms",
                column: "DistributorId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationFiles_DuraformForms_DuraformFormId",
                table: "ApplicationFiles",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
