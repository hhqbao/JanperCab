using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Customers_RemoveCols_AltPhones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SecondPhone",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ThirdPhone",
                table: "Customers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SecondPhone",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThirdPhone",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);
        }
    }
}
