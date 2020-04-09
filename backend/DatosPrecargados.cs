using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace backend.Models
{
    public class DatosPrecargados
    {
        public DatosPrecargados()
        {
        }

        public static async void Precargar(IServiceProvider services)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var _roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                var _context = scope.ServiceProvider.GetRequiredService<BdContext>();


                /****************************LLENADO DE DATOS****************************/

                //PUESTOS
                if (_context.Puestos.Count() == 0)
                {
                    var puesto = new Puesto { nombre = "Vendedor", descripcion = "Atiende a los clientes", habilitado = 1 };
                    _context.Puestos.Add(puesto);
                    await _context.SaveChangesAsync();
                }

                //EMPLEADOS
                if (_context.Personas.Count() == 0)
                {
                    var empleado = new Persona { nom_persona = "Julio García", direccion = "Carchá", dpi = "1234567890", habilitado = true, id_puesto = 1};
                    _context.Personas.Add(empleado);
                    await _context.SaveChangesAsync();

                    var empleado2 = new Persona { nom_persona = "Manuel Paredes", direccion = "Cobán", dpi = "0987654321", habilitado = true, id_puesto = 1};
                    _context.Personas.Add(empleado2);
                    await _context.SaveChangesAsync();
                }

                //USUARIOS
                if (_userManager.Users.Count() == 0)
                {
                    var usuario = new ApplicationUser { UserName = "admin@gmail.com", Email = "admin@gmail.com", id_persona = 2, estado_activo = 1 };

                    await _userManager.CreateAsync(usuario, "Admin1234");
                }

                //ROLES
                if (_roleManager.Roles.Count() == 0)
                {
                    var rol = new ApplicationRole { Name = "Administrador", descripcion = "Tiene todos los permisos", habilitado = 1 };
                    await _roleManager.CreateAsync(rol);

                    var rol2 = new ApplicationRole { Name = "Ejecutivo de ventas", descripcion = "Solo puede vender", habilitado = 1 };
                    await _roleManager.CreateAsync(rol2);
                }

                //PERMISOS
                if (_context.Permisos.Count() == 0)
                {
                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Roles", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Empleados", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Categorias", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Clientes", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Dimensiones", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Facturas", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Productos", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Proveedores", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Puestos", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Unidades de Medida", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Asignar Credenciales", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Administración de Kardex", habilitado = 1 });
                    _context.SaveChanges();

                    _context.Permisos.Add(new Permiso { nom_permiso = "Catalogo", habilitado = 1 });
                    _context.SaveChanges();

                }

                if (_context.Permisos_rol.Count() == 0)
                {
                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 1 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 2 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 3 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 4 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 5 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 6 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 7 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 8 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 9 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 10 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 11 });
                    _context.SaveChanges();

                    _context.Permisos_rol.Add(new PermisoRol { cod_rol = 1, cod_permiso = 12 });
                    _context.SaveChanges();
                }

                //ASIGNAR USUARIO ROL
                if (_context.UserRoles.Count() == 0)
                {
                    var usuario = await _userManager.FindByEmailAsync("admin@gmail.com");
                    var rol = await _roleManager.FindByIdAsync("1");
                    await _userManager.AddToRoleAsync(usuario, rol.Name);
                    await _context.SaveChangesAsync();
                }

                //CATEGORIAS PRUEBA
                if(_context.Categorias.Count() == 0)
                {
                    var categoria1 = new Categoria{ nombre = "Acero", descripcion = "Productos de acero", habilitado = 1 };
                    _context.Categorias.Add(categoria1);
                    await _context.SaveChangesAsync();

                    var categoria2 = new Categoria { nombre = "Motores", descripcion = "Motores de todo tipo", habilitado = 1 };
                    _context.Categorias.Add(categoria2);
                    await _context.SaveChangesAsync();
                }

                //PRODUCTOS PRUEBA
              /*   if(_context.Productos.Count() == 0)
                {
                    var producto = new Producto { cod_producto = "tor1", nom_producto = "Tornillo", descripcion = "Tornillo de acero", costo_compra = 0.10m, precio_unitario = 0.50m, cantidad_existente = 800, habilitado = 1, id_categoria = 1 };
                    _context.Productos.Add(producto);
                    await _context.SaveChangesAsync();

                    var producto2 = new Producto { cod_producto = "mot47", nom_producto = "Motor", descripcion = "100cc", costo_compra = 1000m, precio_unitario = 1500m, cantidad_existente = 5, habilitado = 1, id_categoria = 1 };
                    _context.Productos.Add(producto);
                    await _context.SaveChangesAsync();
                }*/

                //CLIENTES PRUEBA
                if(_context.Productos.Count() == 0)
                {
                    var cliente = new Persona { nom_persona = "Juan", direccion = "Zona 1", telefono = "78787878", nit = "444444-4", habilitado = true };
                    _context.Personas.Add(cliente);
                    await _context.SaveChangesAsync();

                    /**
                    var cliente2 = new Persona { nom_persona = "Josefa", direccion = "Zona 15", telefono = "52458965",  nit = "487856-5", habilitado = true};
                    _context.Personas.Add(cliente);
                    await _context.SaveChangesAsync();
                    */
                }
            }
        }

    }
}