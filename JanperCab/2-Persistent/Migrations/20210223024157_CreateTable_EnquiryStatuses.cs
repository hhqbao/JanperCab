using _1_Domain.Enum;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_EnquiryStatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnquiryStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    DisplayOrder = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnquiryStatuses", x => x.Id);
                });


            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.PreRoute}, 'PreRoute', {(int)DuraformProcessEnum.PreRoute})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Routing}, 'Routing', {(int)DuraformProcessEnum.Routing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Routed}, 'Routed', {(int)DuraformProcessEnum.Routed})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Pressing}, 'Pressing', {(int)DuraformProcessEnum.Pressing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Pressed}, 'Pressed', {(int)DuraformProcessEnum.Pressed})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Cleaned}, 'Cleaned', {(int)DuraformProcessEnum.Cleaned})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Packed}, 'Packed', {(int)DuraformProcessEnum.Packed})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.PickedUp}, 'PickedUp', {(int)DuraformProcessEnum.PickedUp})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)DuraformProcessEnum.Delivered}, 'Delivered', {(int)DuraformProcessEnum.Delivered})");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnquiryStatuses");
        }
    }
}
