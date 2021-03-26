using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class Bind_PressingProcess_To_MachinePresser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DuraformProcesses_MachineId1",
                table: "DuraformProcesses",
                column: "MachineId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId1",
                table: "DuraformProcesses",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId1",
                table: "DuraformProcesses");

            migrationBuilder.DropIndex(
                name: "IX_DuraformProcesses_MachineId1",
                table: "DuraformProcesses");
        }
    }
}
