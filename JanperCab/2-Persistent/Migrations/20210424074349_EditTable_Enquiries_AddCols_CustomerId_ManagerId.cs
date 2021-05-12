using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_AddCols_CustomerId_ManagerId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Enquiries",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ManagerId",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.Sql("Update Enquiries Set CustomerId = CabinetMakerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Enquiries");
        }
    }
}
