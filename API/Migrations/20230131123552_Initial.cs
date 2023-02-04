using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0290dedf-fe75-4f11-8406-3d228888360f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "db26951d-b51a-4f88-937e-06d64d5d4930");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5bdd5bbb-36ae-4244-8eab-f2d4c171ca60", null, "Member", "MEMBER" },
                    { "e6227cc3-f437-4c6a-b20b-b7f95e57ad1e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5bdd5bbb-36ae-4244-8eab-f2d4c171ca60");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e6227cc3-f437-4c6a-b20b-b7f95e57ad1e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0290dedf-fe75-4f11-8406-3d228888360f", null, "Admin", "ADMIN" },
                    { "db26951d-b51a-4f88-937e-06d64d5d4930", null, "Member", "MEMBER" }
                });
        }
    }
}
