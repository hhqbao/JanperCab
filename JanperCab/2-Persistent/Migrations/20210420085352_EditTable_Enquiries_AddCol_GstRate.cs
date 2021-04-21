using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_AddCol_GstRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gst",
                table: "Enquiries",
                newName: "TotalGst");

            migrationBuilder.AddColumn<decimal>(
                name: "GstRate",
                table: "Enquiries",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GstRate",
                table: "Enquiries");

            migrationBuilder.RenameColumn(
                name: "TotalGst",
                table: "Enquiries",
                newName: "Gst");
        }
    }
}
