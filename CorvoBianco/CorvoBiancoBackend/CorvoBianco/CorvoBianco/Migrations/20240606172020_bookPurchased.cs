using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CorvoBianco.Migrations
{
    /// <inheritdoc />
    public partial class bookPurchased : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPurchased",
                table: "Book",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPurchased",
                table: "Book");
        }
    }
}
