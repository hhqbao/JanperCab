using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class ConnectTable_Customers_DuraformForms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerLevel",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "DuraformForms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_CustomerId",
                table: "DuraformForms",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformForms_Customers_CustomerId",
                table: "DuraformForms",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformForms_Customers_CustomerId",
                table: "DuraformForms");

            migrationBuilder.DropIndex(
                name: "IX_DuraformForms_CustomerId",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "DuraformForms");

            migrationBuilder.AddColumn<int>(
                name: "CustomerLevel",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
