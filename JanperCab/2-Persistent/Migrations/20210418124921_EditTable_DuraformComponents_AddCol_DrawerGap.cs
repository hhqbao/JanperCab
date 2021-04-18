using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformComponents_AddCol_DrawerGap : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DrawerGap",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.Sql("Update DuraformComponents Set DrawerGap = 3 Where Discriminator = 'DuraformDrawer'");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DrawerGap",
                table: "DuraformComponents");
        }
    }
}
