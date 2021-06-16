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
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.PreRoute}, 'PreRoute', {(int)ProcessTypeEnum.PreRoute})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.Routing}, 'Routing', {(int)ProcessTypeEnum.Routing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.Pressing}, 'Pressing', {(int)ProcessTypeEnum.Pressing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.Cleaning}, 'Cleaned', {(int)ProcessTypeEnum.Cleaning})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.Packing}, 'Packed', {(int)ProcessTypeEnum.Packing})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.PickingUp}, 'PickedUp', {(int)ProcessTypeEnum.PickingUp})");
            migrationBuilder.Sql(
                $"Insert EnquiryStatuses(Id, Name, DisplayOrder) Values({(int)ProcessTypeEnum.Delivering}, 'Delivered', {(int)ProcessTypeEnum.Delivering})");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnquiryStatuses");
        }
    }
}
