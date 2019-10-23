using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class OtraMigracion44 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tareas",
                columns: table => new
                {
                    cod_tarea = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    descripcion = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tareas", x => x.cod_tarea);
                });

            migrationBuilder.CreateTable(
                name: "tb_categoria",
                columns: table => new
                {
                    id_categoria = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nombre = table.Column<string>(type: "varchar(50)", nullable: true),
                    descripcion = table.Column<string>(type: "varchar(150)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_categoria", x => x.id_categoria);
                });

            migrationBuilder.CreateTable(
                name: "tb_cliente",
                columns: table => new
                {
                    id_cliente = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nom_cliente = table.Column<string>(type: "varchar(100)", nullable: true),
                    direccion = table.Column<string>(type: "varchar(100)", nullable: true),
                    telefono = table.Column<string>(type: "varchar(8)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_cliente", x => x.id_cliente);
                });

            migrationBuilder.CreateTable(
                name: "tb_permiso",
                columns: table => new
                {
                    cod_permiso = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nom_permiso = table.Column<string>(type: "varchar(60)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_permiso", x => x.cod_permiso);
                });

            migrationBuilder.CreateTable(
                name: "tb_proveedor",
                columns: table => new
                {
                    id_proveedor = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nom_proveedor = table.Column<string>(type: "varchar(100)", nullable: true),
                    direccion = table.Column<string>(type: "varchar(100)", nullable: true),
                    telefono = table.Column<string>(type: "varchar(8)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_proveedor", x => x.id_proveedor);
                });

            migrationBuilder.CreateTable(
                name: "tb_puesto",
                columns: table => new
                {
                    cod_puesto = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nombre = table.Column<string>(type: "varchar(45)", nullable: true),
                    descripcion = table.Column<string>(type: "varchar(120)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_puesto", x => x.cod_puesto);
                });

            migrationBuilder.CreateTable(
                name: "tb_role",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    descripcion = table.Column<string>(nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tb_unidad_medida",
                columns: table => new
                {
                    id_unidad_medida = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nom_unidad = table.Column<string>(type: "varchar(45)", nullable: true),
                    abreviatura = table.Column<string>(type: "varchar(10)", nullable: true),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_unidad_medida", x => x.id_unidad_medida);
                });

            migrationBuilder.CreateTable(
                name: "tb_producto",
                columns: table => new
                {
                    id_producto = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    cod_producto = table.Column<string>(type: "varchar(45)", nullable: true),
                    nom_producto = table.Column<string>(type: "varchar(60)", nullable: true),
                    descripcion = table.Column<string>(type: "varchar(150)", nullable: true),
                    costo_compra = table.Column<decimal>(nullable: false),
                    precio_unitario = table.Column<decimal>(nullable: false),
                    cantidad_existente = table.Column<int>(nullable: false),
                    habilitado = table.Column<int>(nullable: false),
                    id_categoria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_producto", x => x.id_producto);
                    table.ForeignKey(
                        name: "FK_tb_producto_tb_categoria_id_categoria",
                        column: x => x.id_categoria,
                        principalTable: "tb_categoria",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "kardex",
                columns: table => new
                {
                    id_kardex = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fecha_fac = table.Column<DateTime>(type: "date", nullable: false),
                    num_factura = table.Column<int>(nullable: false),
                    serie_factura = table.Column<string>(type: "varchar(45)", nullable: true),
                    tipo_operacion = table.Column<sbyte>(type: "tinyint", nullable: false),
                    id_proveedor = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kardex", x => x.id_kardex);
                    table.ForeignKey(
                        name: "FK_kardex_tb_proveedor_id_proveedor",
                        column: x => x.id_proveedor,
                        principalTable: "tb_proveedor",
                        principalColumn: "id_proveedor",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_empleado",
                columns: table => new
                {
                    cod_empleado = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nombre = table.Column<string>(type: "varchar(100)", nullable: true),
                    direccion = table.Column<string>(type: "varchar(250)", nullable: true),
                    dpi = table.Column<string>(type: "varchar(13)", nullable: true),
                    estado_activo = table.Column<int>(nullable: false),
                    cod_puesto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_empleado", x => x.cod_empleado);
                    table.ForeignKey(
                        name: "FK_tb_empleado_tb_puesto_cod_puesto",
                        column: x => x.cod_puesto,
                        principalTable: "tb_puesto",
                        principalColumn: "cod_puesto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Permisos_rol",
                columns: table => new
                {
                    cod_rol = table.Column<int>(nullable: false),
                    cod_permiso = table.Column<int>(nullable: false),
                    id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos_rol", x => new { x.cod_rol, x.cod_permiso });
                    table.ForeignKey(
                        name: "FK_Permisos_rol_tb_permiso_cod_permiso",
                        column: x => x.cod_permiso,
                        principalTable: "tb_permiso",
                        principalColumn: "cod_permiso",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Permisos_rol_tb_role_cod_rol",
                        column: x => x.cod_rol,
                        principalTable: "tb_role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_role_claim",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_role_claim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tb_role_claim_tb_role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "tb_role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_dimension",
                columns: table => new
                {
                    id_producto = table.Column<int>(nullable: false),
                    id_unidad_medida = table.Column<int>(nullable: false),
                    nombre_dimension = table.Column<string>(type: "varchar(45)", nullable: true),
                    valor = table.Column<decimal>(nullable: false),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_dimension", x => new { x.id_producto, x.id_unidad_medida });
                    table.ForeignKey(
                        name: "FK_tb_dimension_tb_producto_id_producto",
                        column: x => x.id_producto,
                        principalTable: "tb_producto",
                        principalColumn: "id_producto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_dimension_tb_unidad_medida_id_unidad_medida",
                        column: x => x.id_unidad_medida,
                        principalTable: "tb_unidad_medida",
                        principalColumn: "id_unidad_medida",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "detalle_kardex",
                columns: table => new
                {
                    id_detalle_kardex = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    cantidad = table.Column<int>(nullable: false),
                    precio_unitario = table.Column<decimal>(nullable: false),
                    id_kardex = table.Column<int>(nullable: false),
                    id_producto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_detalle_kardex", x => x.id_detalle_kardex);
                    table.ForeignKey(
                        name: "FK_detalle_kardex_kardex_id_kardex",
                        column: x => x.id_kardex,
                        principalTable: "kardex",
                        principalColumn: "id_kardex",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_detalle_kardex_tb_producto_id_producto",
                        column: x => x.id_producto,
                        principalTable: "tb_producto",
                        principalColumn: "id_producto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_factura",
                columns: table => new
                {
                    id_factura = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fecha = table.Column<DateTime>(type: "date", nullable: false),
                    estado = table.Column<sbyte>(type: "tinyint", nullable: false),
                    id_cliente = table.Column<int>(nullable: false),
                    id_empleado = table.Column<int>(nullable: false),
                    habilitado = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_factura", x => x.id_factura);
                    table.ForeignKey(
                        name: "FK_tb_factura_tb_cliente_id_cliente",
                        column: x => x.id_cliente,
                        principalTable: "tb_cliente",
                        principalColumn: "id_cliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_factura_tb_empleado_id_empleado",
                        column: x => x.id_empleado,
                        principalTable: "tb_empleado",
                        principalColumn: "cod_empleado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_user",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    cod_empleado = table.Column<int>(nullable: false),
                    estado_activo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_user", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tb_user_tb_empleado_cod_empleado",
                        column: x => x.cod_empleado,
                        principalTable: "tb_empleado",
                        principalColumn: "cod_empleado",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_detalle_factura",
                columns: table => new
                {
                    id_detalle_factura = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    cantidad = table.Column<int>(nullable: false),
                    id_factura = table.Column<int>(nullable: false),
                    id_producto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_detalle_factura", x => x.id_detalle_factura);
                    table.ForeignKey(
                        name: "FK_tb_detalle_factura_tb_factura_id_factura",
                        column: x => x.id_factura,
                        principalTable: "tb_factura",
                        principalColumn: "id_factura",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_detalle_factura_tb_producto_id_producto",
                        column: x => x.id_producto,
                        principalTable: "tb_producto",
                        principalColumn: "id_producto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_user_claim",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_user_claim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tb_user_claim_tb_user_UserId",
                        column: x => x.UserId,
                        principalTable: "tb_user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_user_login",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_user_login", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_tb_user_login_tb_user_UserId",
                        column: x => x.UserId,
                        principalTable: "tb_user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_user_role",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_user_role", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_tb_user_role_tb_role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "tb_role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_user_role_tb_user_UserId",
                        column: x => x.UserId,
                        principalTable: "tb_user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_user_token",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_user_token", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_tb_user_token_tb_user_UserId",
                        column: x => x.UserId,
                        principalTable: "tb_user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_detalle_kardex_id_kardex",
                table: "detalle_kardex",
                column: "id_kardex");

            migrationBuilder.CreateIndex(
                name: "IX_detalle_kardex_id_producto",
                table: "detalle_kardex",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_kardex_id_proveedor",
                table: "kardex",
                column: "id_proveedor");

            migrationBuilder.CreateIndex(
                name: "IX_Permisos_rol_cod_permiso",
                table: "Permisos_rol",
                column: "cod_permiso");

            migrationBuilder.CreateIndex(
                name: "IX_tb_detalle_factura_id_factura",
                table: "tb_detalle_factura",
                column: "id_factura");

            migrationBuilder.CreateIndex(
                name: "IX_tb_detalle_factura_id_producto",
                table: "tb_detalle_factura",
                column: "id_producto");

            migrationBuilder.CreateIndex(
                name: "IX_tb_dimension_id_unidad_medida",
                table: "tb_dimension",
                column: "id_unidad_medida");

            migrationBuilder.CreateIndex(
                name: "IX_tb_empleado_cod_puesto",
                table: "tb_empleado",
                column: "cod_puesto");

            migrationBuilder.CreateIndex(
                name: "IX_tb_factura_id_cliente",
                table: "tb_factura",
                column: "id_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_tb_factura_id_empleado",
                table: "tb_factura",
                column: "id_empleado");

            migrationBuilder.CreateIndex(
                name: "IX_tb_producto_id_categoria",
                table: "tb_producto",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "tb_role",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_role_claim_RoleId",
                table: "tb_role_claim",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "tb_user",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "tb_user",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_user_cod_empleado",
                table: "tb_user",
                column: "cod_empleado",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_user_claim_UserId",
                table: "tb_user_claim",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_user_login_UserId",
                table: "tb_user_login",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_user_role_RoleId",
                table: "tb_user_role",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "detalle_kardex");

            migrationBuilder.DropTable(
                name: "Permisos_rol");

            migrationBuilder.DropTable(
                name: "tareas");

            migrationBuilder.DropTable(
                name: "tb_detalle_factura");

            migrationBuilder.DropTable(
                name: "tb_dimension");

            migrationBuilder.DropTable(
                name: "tb_role_claim");

            migrationBuilder.DropTable(
                name: "tb_user_claim");

            migrationBuilder.DropTable(
                name: "tb_user_login");

            migrationBuilder.DropTable(
                name: "tb_user_role");

            migrationBuilder.DropTable(
                name: "tb_user_token");

            migrationBuilder.DropTable(
                name: "kardex");

            migrationBuilder.DropTable(
                name: "tb_permiso");

            migrationBuilder.DropTable(
                name: "tb_factura");

            migrationBuilder.DropTable(
                name: "tb_producto");

            migrationBuilder.DropTable(
                name: "tb_unidad_medida");

            migrationBuilder.DropTable(
                name: "tb_role");

            migrationBuilder.DropTable(
                name: "tb_user");

            migrationBuilder.DropTable(
                name: "tb_proveedor");

            migrationBuilder.DropTable(
                name: "tb_cliente");

            migrationBuilder.DropTable(
                name: "tb_categoria");

            migrationBuilder.DropTable(
                name: "tb_empleado");

            migrationBuilder.DropTable(
                name: "tb_puesto");
        }
    }
}
