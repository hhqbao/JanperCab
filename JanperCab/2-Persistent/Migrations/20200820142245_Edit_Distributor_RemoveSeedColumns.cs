using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Edit_Distributor_RemoveSeedColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNumberSeed",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "QuoteNumberSeed",
                table: "Customers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderNumberSeed",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuoteNumberSeed",
                table: "Customers",
                type: "int",
                nullable: true);
        }
    }
}
