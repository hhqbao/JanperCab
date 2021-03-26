using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Processes_RenameCol_DuraformProcessType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Process",
                table: "Processes");

            migrationBuilder.AddColumn<int>(
                name: "DuraformProcessType",
                table: "Processes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuraformProcessType",
                table: "Processes");

            migrationBuilder.AddColumn<int>(
                name: "Process",
                table: "Processes",
                type: "int",
                nullable: true);
        }
    }
}
