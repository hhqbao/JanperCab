using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_HingeHoleStyles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HingeHoleStyles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(500)", nullable: false),
                    DoorPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PantryPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HingeHoleStyles", x => x.Id);
                });

            migrationBuilder.Sql(
                  $"Insert HingeHoleStyles(Id, Name, DoorPrice, PantryPrice) Values({(int)HingeHoleStyleEnum.Side}, 'Side', 3, 6)");
            migrationBuilder.Sql(
                $"Insert HingeHoleStyles(Id, Name, DoorPrice, PantryPrice) Values({(int)HingeHoleStyleEnum.Draw}, 'Draw', 8, 8)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HingeHoleStyles");
        }
    }
}
