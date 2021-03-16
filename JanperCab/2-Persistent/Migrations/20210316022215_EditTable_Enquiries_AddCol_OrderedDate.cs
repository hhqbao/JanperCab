using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_Enquiries_AddCol_OrderedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "OrderedDate",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.Sql("Update Enquiries Set OrderedDate = CreatedDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderedDate",
                table: "Enquiries");
        }
    }
}
