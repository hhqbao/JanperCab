using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesigns_AddCols_BT_BB_BL_BR : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BB",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BL",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BR",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BT",
                table: "DuraformDesigns",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BB",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "BL",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "BR",
                table: "DuraformDesigns");

            migrationBuilder.DropColumn(
                name: "BT",
                table: "DuraformDesigns");
        }
    }
}
