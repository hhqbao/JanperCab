﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class EditTable_DuraformDesign_AddColumn_ICB_TOOLING : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_TOOLING",
                table: "DuraformEdgeProfiles");

            migrationBuilder.AddColumn<string>(
                name: "ICB_TOOLING",
                table: "DuraformDesigns",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ICB_TOOLING",
                table: "DuraformDesigns");

            migrationBuilder.AddColumn<string>(
                name: "ICB_TOOLING",
                table: "DuraformEdgeProfiles",
                type: "varchar(1000)",
                nullable: false,
                defaultValue: "");
        }
    }
}
