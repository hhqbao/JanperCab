using Microsoft.EntityFrameworkCore.Migrations;

namespace _2_Persistent.Migrations
{
    public partial class AddRelationComponentToForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId1",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId2",
                table: "DuraformComponents");

            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId3",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId1",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId2",
                table: "DuraformComponents");

            migrationBuilder.DropIndex(
                name: "IX_DuraformComponents_DuraformFormId3",
                table: "DuraformComponents");

            migrationBuilder.AddForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId",
                table: "DuraformComponents");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId1",
                table: "DuraformComponents",
                column: "DuraformFormId");

            migrationBuilder.CreateIndex(
                name: "IX_DuraformComponents_DuraformFormId2",
                table: "DuraformComponents",
                column: "DuraformFormId");

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
                name: "FK_DuraformComponents_DuraformForms_DuraformFormId3",
                table: "DuraformComponents",
                column: "DuraformFormId",
                principalTable: "DuraformForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
