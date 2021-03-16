using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTables_DuraformComponents_DuraformFiles_AddForeignKey_DuraformEnquiry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformEnquiryId",
                table: "DuraformComponents",
                column: "DuraformEnquiryId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationFiles_DuraformEnquiryId",
                table: "ApplicationFiles",
                column: "DuraformEnquiryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationFiles_Enquiries_DuraformEnquiryId",
                table: "ApplicationFiles",
                column: "DuraformEnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_Enquiries_DuraformEnquiryId",
                table: "DuraformComponents",
                column: "DuraformEnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationFiles_Enquiries_DuraformEnquiryId",
                table: "ApplicationFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_Enquiries_DuraformEnquiryId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformEnquiryId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_ApplicationFiles_DuraformEnquiryId",
                table: "ApplicationFiles");
        }
    }
}
