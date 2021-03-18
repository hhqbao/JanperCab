using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTable_Machines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "DuraformProcesses");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "DuraformProcesses",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "DuraformProcesses",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "DuraformProcesses",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MachineId",
                table: "DuraformProcesses",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuraformProcesses_MachineId",
                table: "DuraformProcesses",
                column: "MachineId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId",
                table: "DuraformProcesses",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId",
                table: "DuraformProcesses");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropIndex(
                name: "IX_DuraformProcesses_MachineId",
                table: "DuraformProcesses");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "DuraformProcesses");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "DuraformProcesses");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "DuraformProcesses");

            migrationBuilder.DropColumn(
                name: "MachineId",
                table: "DuraformProcesses");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "DuraformProcesses",
                type: "datetime2",
                nullable: true);
        }
    }
}
