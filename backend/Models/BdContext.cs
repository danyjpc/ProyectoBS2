using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class BdContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public BdContext(DbContextOptions<BdContext> options) : base(options)
        {

        }
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<Puesto> Puestos { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<PermisoRol> Permisos_rol { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; } 
        public DbSet<Kardex> Kardexs { get; set; } 
        public DbSet<Detalle_kardex> Detalles_kardex { get; set; }
        public DbSet<Producto> Productos { get; set; } 
        public DbSet<Dimension> Dimensiones { get; set; } 
        public DbSet<Unidad_medida> Unidad_Medidas { get; set; } 
        public DbSet<Detalle_factura> Detalles_facturas { get; set; }
        public DbSet<Factura> Facturas { get; set; } 
        public DbSet<Persona> Personas { get; set; }
        public DbSet<Categoria> Categorias { get; set; } 
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

         /*   modelBuilder.Entity<ApplicationUser>()
            .HasOne(x=> x.persona)
            .WithOne(x => x.usuario);*/

            //Cambiando nombres de tablas predeterminadas
            modelBuilder.Entity<ApplicationUser>()
            .ToTable("tb_user");
            modelBuilder.Entity<ApplicationRole>()
            .ToTable("tb_role");
            modelBuilder.Entity<IdentityUserRole<int>>()
            .ToTable("tb_user_role");
            modelBuilder.Entity<IdentityUserClaim<int>>()
            .ToTable("tb_user_claim");
            modelBuilder.Entity<IdentityUserLogin<int>>()
            .ToTable("tb_user_login");
            modelBuilder.Entity<IdentityUserToken<int>>()
            .ToTable("tb_user_token");
            modelBuilder.Entity<IdentityRoleClaim<int>>()
            .ToTable("tb_role_claim");

            modelBuilder.Entity<Persona>()
            .HasKey(x => x.id_persona);

            /*//Un puesto, muchos empleado
            modelBuilder.Entity<Persona>()
            .HasOne(em => em.puesto)
            .WithMany(pu => pu.personas)
            .HasForeignKey(em => em.id_puesto);*/

            //Clave compuesta del campo PermisoRol
            modelBuilder.Entity<PermisoRol>()
            .HasKey(x => new {x.cod_rol, x.cod_permiso});

            //Un proveedor, muchos kardex
            modelBuilder.Entity<Kardex>()
            .HasOne(ka => ka.proveedor)
            .WithMany(pr => pr.kardexs)
            .HasForeignKey(ka => ka.id_proveedor);

            //Un kardex, muchos detalle_kardex
            modelBuilder.Entity<Detalle_kardex>()
            .HasOne(dka => dka.kardex)
            .WithMany(ka => ka.detalles_kardex)
            .HasForeignKey(dka => dka.id_kardex);
            
            //Un producto, muchos detalle_kardex
            modelBuilder.Entity<Detalle_kardex>()
            .HasOne(dka => dka.producto)
            .WithMany(pr => pr.detalles_kardex)
            .HasForeignKey(dka => dka.id_producto);

            //Llave compuesta, Dimension
            modelBuilder.Entity<Dimension>()
            .HasKey(x => new {x.id_producto, x.id_unidad_medida});

            //Un producto, muchas dimension
            modelBuilder.Entity<Dimension>()
            .HasOne(dim => dim.producto)
            .WithMany(pr => pr.dimensiones)
            .HasForeignKey(dim => dim.id_producto);

            //Una unidad_medida, muchas dimension
            modelBuilder.Entity<Dimension>()
            .HasOne(dim => dim.unidad_medida)
            .WithMany(um => um.dimensiones)
            .HasForeignKey(dim => dim.id_unidad_medida);

            //Una categoria, muchos producto
            modelBuilder.Entity<Producto>()
            .HasOne(pr => pr.categoria)
            .WithMany(cat => cat.productos)
            .HasForeignKey(pr => pr.id_categoria);

            //Un producto, muchos detalle_factura
            modelBuilder.Entity<Detalle_factura>()
            .HasOne(df => df.producto)
            .WithMany(pr => pr.detalles_factura)
            .HasForeignKey(df => df.id_producto);

            //Una factura, muchos detalle_factura
            modelBuilder.Entity<Detalle_factura>()
            .HasOne(df => df.factura)
            .WithMany(fa => fa.detalles_factura)
            .HasForeignKey(df => df.id_factura);

            //AÑADIDO: Un usuario, muchas facturas (cliente)
            modelBuilder.Entity<Factura>()
            .HasOne(fa => fa.usuario_cliente)
            .WithMany(usu => usu.facturas_cliente)
            .HasForeignKey(fa => fa.id_usu_cliente);

            //AÑADIDO: Un usuario, muchas facturas (empleado)
            modelBuilder.Entity<Factura>()
            .HasOne(fa => fa.usuario_empleado)
            .WithMany(usu => usu.facturas_empleado)
            .HasForeignKey(fa => fa.id_usu_empleado);

            //AñADIDO: Una persona, muchos usuarios
            modelBuilder.Entity<ApplicationUser>()
            .HasOne(au => au.persona)
            .WithMany(per => per.usuarios)
            .HasForeignKey(au => au.id_persona);

            //AÑADIDO: Un puesto, muchas personas
            modelBuilder.Entity<Persona>()
            .HasOne(per => per.puesto)
            .WithMany(pu => pu.personas)
            .HasForeignKey(per => per.id_puesto);

            //QUITAR: Una cliente, muchas factura
           /* modelBuilder.Entity<Factura>()
            .HasOne(fa => fa.cliente)
            .WithMany(cl => cl.facturas)
            .HasForeignKey(fa => fa.id_cliente);*/

           /* //QUITAR: Un empleado, muchas factura
            modelBuilder.Entity<Factura>()
            .HasOne(fa => fa.empleado)
            .WithMany(em => em.facturas)
            .HasForeignKey(fa => fa.id_empleado);*/






            //


        }
    }
}