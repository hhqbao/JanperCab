using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_DuraformProcesses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuraformProcesses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    DisplayOrder = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuraformProcesses", x => x.Id);
                });

            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.PreRoute}, 'PreRoute', {(int)DuraformProcessEnum.PreRoute})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Routing}, 'Routing', {(int)DuraformProcessEnum.Routing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Pressing}, 'Pressing', {(int)DuraformProcessEnum.Pressing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Cleaning}, 'Cleaned', {(int)DuraformProcessEnum.Cleaning})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Packing}, 'Packed', {(int)DuraformProcessEnum.Packing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.PickingUp}, 'PickedUp', {(int)DuraformProcessEnum.PickingUp})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Delivering}, 'Delivered', {(int)DuraformProcessEnum.Delivering})");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuraformProcesses");
        }
    }
}
