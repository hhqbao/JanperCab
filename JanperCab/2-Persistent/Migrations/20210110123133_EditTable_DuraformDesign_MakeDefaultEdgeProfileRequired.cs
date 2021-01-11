using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesign_MakeDefaultEdgeProfileRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DefaultEdgeProfileId",
                table: "DuraformDesigns",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DefaultEdgeProfileId",
                table: "DuraformDesigns",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
