using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Rework_CustomerSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Customers_DistributorId",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Customers_CabinetMakerId",
                table: "Enquiries");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Customers_DistributorId",
                table: "Enquiries");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Customers_CabinetMakerId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Customers_DistributorId",
                table: "Invoices");

            //migrationBuilder.DropIndex(
            //    name: "IX_Invoices_CabinetMakerId",
            //    table: "Invoices");

            //migrationBuilder.DropIndex(
            //    name: "IX_Invoices_DistributorId",
            //    table: "Invoices");

            //migrationBuilder.DropIndex(
            //    name: "IX_Enquiries_CabinetMakerId",
            //    table: "Enquiries");

            //migrationBuilder.DropIndex(
            //    name: "IX_Enquiries_DistributorId",
            //    table: "Enquiries");

            //migrationBuilder.DropIndex(
            //    name: "IX_Customers_DistributorId",
            //    table: "Customers");

            migrationBuilder.DropColumn(
                name: "CabinetMakerId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "CabinetMakerId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "ContactPerson",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Postcode",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Suburb",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Invoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "Customers",
                type: "varchar(MAX)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountRate",
                table: "Customers",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.Sql("Update Customers Set DiscountRate = 0");

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountRate",
                table: "Customers",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ManagerId",
                table: "Customers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CustomerId",
                table: "Invoices",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ManagerId",
                table: "Customers",
                column: "ManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Customers_ManagerId",
                table: "Customers",
                column: "ManagerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Customers_CustomerId",
                table: "Invoices",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Customers_ManagerId",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Customers_CustomerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_CustomerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Customers_ManagerId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "CabinetMakerId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CabinetMakerId",
                table: "Enquiries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Enquiries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(MAX)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountRate",
                table: "Customers",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "DistributorId",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPerson",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Postcode",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Suburb",
                table: "Customers",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CabinetMakerId",
                table: "Invoices",
                column: "CabinetMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_DistributorId",
                table: "Invoices",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_CabinetMakerId",
                table: "Enquiries",
                column: "CabinetMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_DistributorId",
                table: "Enquiries",
                column: "DistributorId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Customers_CabinetMakerId",
                table: "Enquiries",
                column: "CabinetMakerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Customers_DistributorId",
                table: "Enquiries",
                column: "DistributorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Customers_CabinetMakerId",
                table: "Invoices",
                column: "CabinetMakerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Customers_DistributorId",
                table: "Invoices",
                column: "DistributorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
