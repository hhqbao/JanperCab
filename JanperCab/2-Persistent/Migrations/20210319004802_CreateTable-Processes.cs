using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTableProcesses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformProcesses_Enquiries_DuraformEnquiryId",
                table: "DuraformProcesses");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId",
                table: "DuraformProcesses");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId1",
                table: "DuraformProcesses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DuraformProcesses",
                table: "DuraformProcesses");

            migrationBuilder.RenameTable(
                name: "DuraformProcesses",
                newName: "Processes");

            migrationBuilder.RenameIndex(
                name: "IX_DuraformProcesses_MachineId1",
                table: "Processes",
                newName: "IX_Processes_MachineId1");

            migrationBuilder.RenameIndex(
                name: "IX_DuraformProcesses_MachineId",
                table: "Processes",
                newName: "IX_Processes_MachineId");

            migrationBuilder.RenameIndex(
                name: "IX_DuraformProcesses_DuraformEnquiryId",
                table: "Processes",
                newName: "IX_Processes_DuraformEnquiryId");

            migrationBuilder.AlterColumn<int>(
                name: "Process",
                table: "Processes",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DuraformEnquiryId",
                table: "Processes",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Processes",
                table: "Processes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_Enquiries_DuraformEnquiryId",
                table: "Processes",
                column: "DuraformEnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Processes_Machines_MachineId",
                table: "Processes",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Enquiries_DuraformEnquiryId",
                table: "Processes");

            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Machines_MachineId",
                table: "Processes");

            migrationBuilder.DropForeignKey(
                name: "FK_Processes_Machines_MachineId1",
                table: "Processes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Processes",
                table: "Processes");

            migrationBuilder.RenameTable(
                name: "Processes",
                newName: "DuraformProcesses");

            migrationBuilder.RenameIndex(
                name: "IX_Processes_MachineId1",
                table: "DuraformProcesses",
                newName: "IX_DuraformProcesses_MachineId1");

            migrationBuilder.RenameIndex(
                name: "IX_Processes_MachineId",
                table: "DuraformProcesses",
                newName: "IX_DuraformProcesses_MachineId");

            migrationBuilder.RenameIndex(
                name: "IX_Processes_DuraformEnquiryId",
                table: "DuraformProcesses",
                newName: "IX_DuraformProcesses_DuraformEnquiryId");

            migrationBuilder.AlterColumn<int>(
                name: "Process",
                table: "DuraformProcesses",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DuraformEnquiryId",
                table: "DuraformProcesses",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DuraformProcesses",
                table: "DuraformProcesses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformProcesses_Enquiries_DuraformEnquiryId",
                table: "DuraformProcesses",
                column: "DuraformEnquiryId",
                principalTable: "Enquiries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId",
                table: "DuraformProcesses",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformProcesses_Machines_MachineId1",
                table: "DuraformProcesses",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
