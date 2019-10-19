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
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Puesto> Puestos { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<PermisoRol> Permisos_rol { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
            .HasOne(x=> x.empleado)
            .WithOne(x => x.usuario);

            //Cambiando nombres de tablas predeterminadas
            modelBuilder.Entity<ApplicationUser>()
            .ToTable("user");
            modelBuilder.Entity<ApplicationRole>()
            .ToTable("role");
            modelBuilder.Entity<IdentityUserRole<int>>()
            .ToTable("user_role");
            modelBuilder.Entity<IdentityUserClaim<int>>()
            .ToTable("user_claim");
            modelBuilder.Entity<IdentityUserLogin<int>>()
            .ToTable("user_login");
            modelBuilder.Entity<IdentityUserToken<int>>()
            .ToTable("user_token");
            modelBuilder.Entity<IdentityRoleClaim<int>>()
            .ToTable("role_claim");

            modelBuilder.Entity<Empleado>()
            .HasKey(x => x.cod_empleado);

            //Un puesto tiene muchos empleados
            modelBuilder.Entity<Empleado>()
                .HasOne(p => p.puesto)
                .WithMany(e => e.Empleado)
                .HasForeignKey(p => p.cod_puesto);

            //Muchos permisos a muchos roles
             modelBuilder.Entity<PermisoRol>()
                .HasKey(k => new { k.cod_rol, k.cod_permiso });

            modelBuilder.Entity<PermisoRol>()
                .HasOne(r => r.ApplicationRole)
                .WithMany(r => r.Permiso_rol)
                .HasForeignKey(r => r.cod_rol);

            modelBuilder.Entity<PermisoRol>()
                .HasOne(p => p.permiso)
                .WithMany(p => p.Permiso_Rol)
                .HasForeignKey(p => p.cod_permiso);
        }
    }
}