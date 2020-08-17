using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditClass_Distributor_AddColumns_QuoteNumberSeed_OrderNumberSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderNumberSeed",
                table: "Customers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuoteNumberSeed",
                table: "Customers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNumberSeed",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "QuoteNumberSeed",
                table: "Customers");
        }
    }
}
