﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

namespace backend.Migrations
{
    [DbContext(typeof(BdContext))]
    partial class BdContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("tb_role_claim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("tb_user_claim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("tb_user_login");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("tb_user_role");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("tb_user_token");
                });

            modelBuilder.Entity("backend.Models.ApplicationRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.Property<string>("descripcion");

                    b.Property<int>("habilitado");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("tb_role");
                });

            modelBuilder.Entity("backend.Models.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.Property<int>("estado_activo");

                    b.Property<DateTime>("fecha_registro")
                        .HasColumnType("date");

                    b.Property<int>("id_persona");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("id_persona");

                    b.ToTable("tb_user");
                });

            modelBuilder.Entity("backend.Models.Categoria", b =>
                {
                    b.Property<int>("id_categoria")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("descripcion")
                        .HasColumnType("varchar(150)");

                    b.Property<int>("habilitado");

                    b.Property<string>("nombre")
                        .HasColumnType("varchar(50)");

                    b.HasKey("id_categoria");

                    b.ToTable("tb_categoria");
                });

            modelBuilder.Entity("backend.Models.Detalle_factura", b =>
                {
                    b.Property<int>("id_detalle_factura")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("cantidad");

                    b.Property<int>("id_factura");

                    b.Property<int>("id_producto");

                    b.HasKey("id_detalle_factura");

                    b.HasIndex("id_factura");

                    b.HasIndex("id_producto");

                    b.ToTable("tb_detalle_factura");
                });

            modelBuilder.Entity("backend.Models.Detalle_kardex", b =>
                {
                    b.Property<int>("id_detalle_kardex")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("cantidad");

                    b.Property<int>("id_kardex");

                    b.Property<int>("id_producto");

                    b.Property<decimal>("precio_unitario");

                    b.HasKey("id_detalle_kardex");

                    b.HasIndex("id_kardex");

                    b.HasIndex("id_producto");

                    b.ToTable("detalle_kardex");
                });

            modelBuilder.Entity("backend.Models.Dimension", b =>
                {
                    b.Property<int>("id_producto");

                    b.Property<int>("id_unidad_medida");

                    b.Property<int>("habilitado");

                    b.Property<int>("id_dimension");

                    b.Property<string>("nombre_dimension")
                        .HasColumnType("varchar(45)");

                    b.Property<decimal>("valor");

                    b.HasKey("id_producto", "id_unidad_medida");

                    b.HasAlternateKey("id_dimension");

                    b.HasIndex("id_unidad_medida");

                    b.ToTable("tb_dimension");
                });

            modelBuilder.Entity("backend.Models.Factura", b =>
                {
                    b.Property<int>("id_factura")
                        .ValueGeneratedOnAdd();

                    b.Property<sbyte>("estado")
                        .HasColumnType("tinyint");

                    b.Property<DateTime>("fecha")
                        .HasColumnType("date");

                    b.Property<int>("habilitado");

                    b.Property<int>("id_usu_cliente");

                    b.Property<int>("id_usu_empleado");

                    b.Property<string>("modo_envio")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("modo_pago")
                        .HasColumnType("varchar(60)");

                    b.Property<decimal>("total");

                    b.HasKey("id_factura");

                    b.HasIndex("id_usu_cliente");

                    b.HasIndex("id_usu_empleado");

                    b.ToTable("tb_factura");
                });

            modelBuilder.Entity("backend.Models.Kardex", b =>
                {
                    b.Property<int>("id_kardex")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("fecha_fac")
                        .HasColumnType("date");

                    b.Property<int>("id_proveedor");

                    b.Property<int?>("num_factura");

                    b.Property<string>("serie_factura")
                        .HasColumnType("varchar(45)");

                    b.Property<sbyte>("tipo_operacion")
                        .HasColumnType("tinyint");

                    b.Property<byte>("validado");

                    b.HasKey("id_kardex");

                    b.HasIndex("id_proveedor");

                    b.ToTable("kardex");
                });

            modelBuilder.Entity("backend.Models.Permiso", b =>
                {
                    b.Property<int>("cod_permiso")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("habilitado");

                    b.Property<string>("nom_permiso")
                        .HasColumnType("varchar(60)");

                    b.HasKey("cod_permiso");

                    b.ToTable("tb_permiso");
                });

            modelBuilder.Entity("backend.Models.PermisoRol", b =>
                {
                    b.Property<int>("cod_rol");

                    b.Property<int>("cod_permiso");

                    b.Property<int>("id");

                    b.HasKey("cod_rol", "cod_permiso");

                    b.HasIndex("cod_permiso");

                    b.ToTable("Permisos_rol");
                });

            modelBuilder.Entity("backend.Models.Persona", b =>
                {
                    b.Property<int>("id_persona")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("direccion")
                        .HasColumnType("varchar(150)");

                    b.Property<string>("dpi")
                        .HasColumnType("varchar(13)");

                    b.Property<bool>("habilitado");

                    b.Property<int?>("id_puesto");

                    b.Property<string>("nit")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("nom_persona")
                        .HasColumnType("varchar(120)");

                    b.Property<string>("telefono")
                        .HasColumnType("varchar(8)");

                    b.HasKey("id_persona");

                    b.HasIndex("id_puesto");

                    b.ToTable("tb_persona");
                });

            modelBuilder.Entity("backend.Models.Producto", b =>
                {
                    b.Property<int>("id_producto")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("cantidad_existente");

                    b.Property<string>("cod_producto")
                        .HasColumnType("varchar(45)");

                    b.Property<decimal>("costo_compra");

                    b.Property<string>("descripcion")
                        .HasColumnType("varchar(150)");

                    b.Property<int>("habilitado");

                    b.Property<int>("id_categoria");

                    b.Property<string>("nom_producto")
                        .HasColumnType("varchar(60)");

                    b.Property<decimal>("precio_unitario");

                    b.Property<int>("stock_maximo");

                    b.Property<int>("stock_minimo");

                    b.HasKey("id_producto");

                    b.HasIndex("id_categoria");

                    b.ToTable("tb_producto");
                });

            modelBuilder.Entity("backend.Models.Proveedor", b =>
                {
                    b.Property<int>("id_proveedor")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("direccion")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("habilitado");

                    b.Property<string>("nom_proveedor")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("telefono")
                        .HasColumnType("varchar(8)");

                    b.HasKey("id_proveedor");

                    b.ToTable("tb_proveedor");
                });

            modelBuilder.Entity("backend.Models.Puesto", b =>
                {
                    b.Property<int>("cod_puesto")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("descripcion")
                        .HasColumnType("varchar(120)");

                    b.Property<int>("habilitado");

                    b.Property<string>("nombre")
                        .HasColumnType("varchar(45)");

                    b.HasKey("cod_puesto");

                    b.ToTable("tb_puesto");
                });

            modelBuilder.Entity("backend.Models.Tarea", b =>
                {
                    b.Property<int>("cod_tarea")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("descripcion")
                        .HasColumnType("varchar(200)");

                    b.HasKey("cod_tarea");

                    b.ToTable("tareas");
                });

            modelBuilder.Entity("backend.Models.Unidad_medida", b =>
                {
                    b.Property<int>("id_unidad_medida")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("abreviatura")
                        .HasColumnType("varchar(10)");

                    b.Property<int>("habilitado");

                    b.Property<string>("nom_unidad")
                        .HasColumnType("varchar(45)");

                    b.HasKey("id_unidad_medida");

                    b.ToTable("tb_unidad_medida");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("backend.Models.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("backend.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("backend.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("backend.Models.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("backend.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.ApplicationUser", b =>
                {
                    b.HasOne("backend.Models.Persona", "persona")
                        .WithMany("usuarios")
                        .HasForeignKey("id_persona")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Detalle_factura", b =>
                {
                    b.HasOne("backend.Models.Factura", "factura")
                        .WithMany("detalles_factura")
                        .HasForeignKey("id_factura")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.Producto", "producto")
                        .WithMany("detalles_factura")
                        .HasForeignKey("id_producto")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Detalle_kardex", b =>
                {
                    b.HasOne("backend.Models.Kardex", "kardex")
                        .WithMany("detalles_kardex")
                        .HasForeignKey("id_kardex")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.Producto", "producto")
                        .WithMany("detalles_kardex")
                        .HasForeignKey("id_producto")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Dimension", b =>
                {
                    b.HasOne("backend.Models.Producto", "producto")
                        .WithMany("dimensiones")
                        .HasForeignKey("id_producto")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.Unidad_medida", "unidad_medida")
                        .WithMany("dimensiones")
                        .HasForeignKey("id_unidad_medida")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Factura", b =>
                {
                    b.HasOne("backend.Models.ApplicationUser", "usuario_cliente")
                        .WithMany("facturas_cliente")
                        .HasForeignKey("id_usu_cliente")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.ApplicationUser", "usuario_empleado")
                        .WithMany("facturas_empleado")
                        .HasForeignKey("id_usu_empleado")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Kardex", b =>
                {
                    b.HasOne("backend.Models.Proveedor", "proveedor")
                        .WithMany("kardexs")
                        .HasForeignKey("id_proveedor")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.PermisoRol", b =>
                {
                    b.HasOne("backend.Models.Permiso", "permiso")
                        .WithMany("Permiso_Rol")
                        .HasForeignKey("cod_permiso")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.ApplicationRole", "ApplicationRole")
                        .WithMany("Permiso_rol")
                        .HasForeignKey("cod_rol")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("backend.Models.Persona", b =>
                {
                    b.HasOne("backend.Models.Puesto", "puesto")
                        .WithMany("personas")
                        .HasForeignKey("id_puesto");
                });

            modelBuilder.Entity("backend.Models.Producto", b =>
                {
                    b.HasOne("backend.Models.Categoria", "categoria")
                        .WithMany("productos")
                        .HasForeignKey("id_categoria")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
