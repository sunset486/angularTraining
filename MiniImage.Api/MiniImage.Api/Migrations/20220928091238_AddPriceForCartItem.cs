using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniImage.Api.Migrations
{
    public partial class AddPriceForCartItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "StuffPrice",
                table: "CartItems",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StuffPrice",
                table: "CartItems");
        }
    }
}
