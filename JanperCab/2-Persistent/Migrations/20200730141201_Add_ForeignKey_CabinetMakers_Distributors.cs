using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Add_ForeignKey_CabinetMakers_Distributors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Customers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_DistributorId",
                table: "Customers",
                column: "DistributorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Customers_DistributorId",
                table: "Customers",
                column: "DistributorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Customers_DistributorId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_DistributorId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Customers");
        }
    }
}
