using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Customers_AddCol_CustomerCategoryId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerCategoryId",
                table: "Customers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CustomerCategoryId",
                table: "Customers",
                column: "CustomerCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_CustomerCategories_CustomerCategoryId",
                table: "Customers",
                column: "CustomerCategoryId",
                principalTable: "CustomerCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_CustomerCategories_CustomerCategoryId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CustomerCategoryId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CustomerCategoryId",
                table: "Customers");
        }
    }
}
