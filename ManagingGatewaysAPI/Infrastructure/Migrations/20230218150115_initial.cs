using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GateWay",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SerialNo = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    IPAddress = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GateWay", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PeripheralDevice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Vendor = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", maxLength: 50, nullable: false),
                    Status = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeripheralDevice", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DevicesForGateWays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DeviceId = table.Column<int>(type: "INTEGER", nullable: false),
                    GateWayId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DevicesForGateWays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DevicesForGateWays_GateWay_GateWayId",
                        column: x => x.GateWayId,
                        principalTable: "GateWay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DevicesForGateWays_GateWayId",
                table: "DevicesForGateWays",
                column: "GateWayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DevicesForGateWays");

            migrationBuilder.DropTable(
                name: "PeripheralDevice");

            migrationBuilder.DropTable(
                name: "GateWay");
        }
    }
}
