using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_Trucks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trucks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlateNumber = table.Column<string>(type: "varchar(10)", nullable: false),
                    IsDisabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trucks", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trucks_PlateNumber",
                table: "Trucks",
                column: "PlateNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Trucks");
        }
    }
}
