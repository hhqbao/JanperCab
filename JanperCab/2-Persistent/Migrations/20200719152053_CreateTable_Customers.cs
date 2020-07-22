using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_Customers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerLevel = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(MAX)", nullable: true),
                    InvoiceTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceSuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoiceState = table.Column<string>(type: "varchar(255)", nullable: false),
                    InvoicePostcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryTo = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliverySuburb = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryState = table.Column<string>(type: "varchar(255)", nullable: false),
                    DeliveryPostcode = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CustomerId",
                table: "AspNetUsers",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Customers_CustomerId",
                table: "AspNetUsers",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Customers_CustomerId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CustomerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "AspNetUsers");
        }
    }
}
