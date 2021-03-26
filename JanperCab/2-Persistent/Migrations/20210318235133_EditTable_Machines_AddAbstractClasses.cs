using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Machines_AddAbstractClasses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Machines",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "MachineType",
                table: "Machines",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "MachineType",
                table: "Machines");
        }
    }
}
