using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesigns_AddCol_EXTERNAL_SHAPE_FILE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ICB_EXTERNAL_SHAPE_FILE",
                table: "DuraformDesigns",
                type: "varchar(1000)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_EXTERNAL_SHAPE_FILE",
                table: "DuraformDesigns");
        }
    }
}
