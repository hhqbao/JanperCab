using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTables_DuraformComponents_DuraformFiles_AddCol_DuraformEnquiryId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DuraformEnquiryId",
                table: "DuraformComponents",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DuraformEnquiryId",
                table: "ApplicationFiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuraformEnquiryId",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DuraformEnquiryId",
                table: "ApplicationFiles");
        }
    }
}
