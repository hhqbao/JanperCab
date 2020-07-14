using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class CreateTables_DuraformPantryDoors_DuraformEndPanels_DuraformDrawers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.AddColumn<decimal>(
                name: "DrawerFive",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DrawerFour",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DrawerOne",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DrawerThree",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DrawerTwo",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DuraformDrawerTypeId",
                table: "DuraformComponents",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExtraRailBottom",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExtraRailTop",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfShields",
                table: "DuraformComponents",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RailCenter",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RailLeft",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RailRight",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ChairRailHeight",
                table: "DuraformComponents",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChairRailTypeId",
                table: "DuraformComponents",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformDrawerTypeId",
                table: "DuraformComponents",
                column: "DuraformDrawerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId1",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId2",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_ChairRailTypeId",
                table: "DuraformComponents",
                column: "ChairRailTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId3",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformDrawerTypes_DuraformDrawerTypeId",
                table: "DuraformComponents",
                column: "DuraformDrawerTypeId",
                principalTable: "DuraformDrawerTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId1",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId2",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_PantryDoorChairRailTypes_ChairRailTypeId",
                table: "DuraformComponents",
                column: "ChairRailTypeId",
                principalTable: "PantryDoorChairRailTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId3",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformDrawerTypes_DuraformDrawerTypeId",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId1",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId2",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_PantryDoorChairRailTypes_ChairRailTypeId",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId3",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformDrawerTypeId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId1",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId2",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_ChairRailTypeId",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId3",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DrawerFive",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DrawerFour",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DrawerOne",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DrawerThree",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DrawerTwo",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "DuraformDrawerTypeId",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "ExtraRailBottom",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "ExtraRailTop",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "NumberOfShields",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "RailCenter",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "RailLeft",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "RailRight",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "ChairRailHeight",
                table: "DuraformComponents");

            migrationBuilder.DropColumn(
                name: "ChairRailTypeId",
                table: "DuraformComponents");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
