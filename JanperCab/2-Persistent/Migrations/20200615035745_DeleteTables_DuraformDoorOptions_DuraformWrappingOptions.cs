using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class DeleteTables_DuraformDoorOptions_DuraformWrappingOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformDoorOptions");

            migrationBuilder.DropTable(
                name: "DuraformWrappingOptions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformDoorOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformDoorOptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DuraformWrappingOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformWrappingOptions", x => x.Id);
                });
        }
    }
}
