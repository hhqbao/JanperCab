using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class AddData_NewDuraformDesign_Latsq : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "Insert DuraformDesigns(Name, ImageUrl, IsPopular, DuraformSerieId, DefaultEdgeProfileId, HasNoArch) Values('Latsq', 'Latsq.jpg', 0, 4, 3, 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from DuraformDesigns Where Name = 'Latsq'");
        }
    }
}
