using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class RecreateTable_Customers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(MAX)", nullable: true),
                    InvoiceTo = table.Column<string>(type: "varchar(255)", nullable: true),
                    InvoiceAddress = table.Column<string>(type: "varchar(255)", nullable: true),
                    InvoiceSuburb = table.Column<string>(type: "varchar(255)", nullable: true),
                    InvoiceState = table.Column<string>(type: "varchar(255)", nullable: true),
                    InvoicePostcode = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeliveryTo = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeliveryAddress = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeliverySuburb = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeliveryState = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeliveryPostcode = table.Column<string>(type: "varchar(255)", nullable: true),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
