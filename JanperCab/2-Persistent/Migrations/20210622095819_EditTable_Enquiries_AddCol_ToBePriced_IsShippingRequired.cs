using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_AddCol_ToBePriced_IsShippingRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsShippingRequired",
                table: "Enquiries",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ToBePriced",
                table: "Enquiries",
                nullable: false,
                defaultValue: false);

            migrationBuilder.Sql("Update Enquiries Set IsShippingRequired = 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsShippingRequired",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ToBePriced",
                table: "Enquiries");
        }
    }
}
