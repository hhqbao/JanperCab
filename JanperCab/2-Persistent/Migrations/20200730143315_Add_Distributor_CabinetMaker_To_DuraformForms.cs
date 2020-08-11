using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Add_Distributor_CabinetMaker_To_DuraformForms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CabinetMakerId",
                table: "DuraformForms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "DuraformForms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_CabinetMakerId",
                table: "DuraformForms",
                column: "CabinetMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformForms_DistributorId",
                table: "DuraformForms",
                column: "DistributorId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformForms_Customers_CabinetMakerId",
                table: "DuraformForms",
                column: "CabinetMakerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformForms_Customers_DistributorId",
                table: "DuraformForms",
                column: "DistributorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformForms_Customers_CabinetMakerId",
                table: "DuraformForms");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformForms_Customers_DistributorId",
                table: "DuraformForms");

            migrationBuilder.DropIndex(
                name: "IX_DuraformForms_CabinetMakerId",
                table: "DuraformForms");

            migrationBuilder.DropIndex(
                name: "IX_DuraformForms_DistributorId",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "CabinetMakerId",
                table: "DuraformForms");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "DuraformForms");
        }
    }
}
