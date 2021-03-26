using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Processes_RenameCol_EnquiryId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Enquiries_DuraformEnquiryId",
                table: "Processes");

            migrationBuilder.DropIndex(
                name: "IX_Processes_DuraformEnquiryId",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "DuraformEnquiryId",
                table: "Processes");

            migrationBuilder.AddColumn<int>(
                name: "EnquiryId",
                table: "Processes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Processes_EnquiryId",
                table: "Processes",
                column: "EnquiryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_Enquiries_EnquiryId",
                table: "Processes",
                column: "EnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Enquiries_EnquiryId",
                table: "Processes");

            migrationBuilder.DropIndex(
                name: "IX_Processes_EnquiryId",
                table: "Processes");

            migrationBuilder.DropColumn(
                name: "EnquiryId",
                table: "Processes");

            migrationBuilder.AddColumn<int>(
                name: "DuraformEnquiryId",
                table: "Processes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Processes_DuraformEnquiryId",
                table: "Processes",
                column: "DuraformEnquiryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_Enquiries_DuraformEnquiryId",
                table: "Processes",
                column: "DuraformEnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
