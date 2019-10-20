using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RolesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly BdContext _context;

        public RolesController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        /************************************AREA DE VISTAS********************************/

        //OBTENER TODOS LOS ROLES
        [HttpGet]
        public async Task<List<ApplicationRole>> ObtenerRoles()
        {
            var roles = await _roleManager.Roles.Select(x => new ApplicationRole
            {
                Id = x.Id,
                Name = x.Name,
                descripcion = x.descripcion,
                habilitado = x.habilitado
            }).ToListAsync();

            return roles;
        }

        

        //Obtener solo roles habilitados
        [Route("RolesHabilitados")]
        [HttpGet]
        public async Task<List<ApplicationRole>> ObtenerRolesHabilitados()
        {
            var roles = await _roleManager.Roles.Where(x => x.habilitado == 1).Select(x => new ApplicationRole
            {
                Id = x.Id,
                Name = x.Name,
                descripcion = x.descripcion,
                habilitado = x.habilitado
            }).ToListAsync();

            return roles;
        }

        //Obtener solo roles deshabilitados
        [Route("RolesDeshabilitados")]
        [HttpGet]
        public async Task<List<ApplicationRole>> ObtenerRolesDeshabilitados()
        {
            var roles = await _roleManager.Roles.Where(x => x.habilitado == 0).Select(x => new ApplicationRole
            {
                Id = x.Id,
                Name = x.Name,
                descripcion = x.descripcion,
                habilitado = x.habilitado
            }).ToListAsync();

            return roles;
        }


        //Creacion de nuevo rol
        [HttpPost]
        [Route("CrearRol")]
        public async Task<IActionResult> CrearRol([FromBody] ApplicationRole rol_info)
        {

            if (!await _roleManager.RoleExistsAsync(rol_info.Name.ToString().ToUpper()))
            {
                var role = new ApplicationRole { Name = rol_info.Name.ToUpper(), descripcion = rol_info.descripcion, habilitado = rol_info.habilitado };
                var result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Rol creado exitosamente." });
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest(new { message = "Rol Existente" });
            }
        }

        //Obtener un rol
        [HttpGet("BuscarRol/{cod_rol}")]
        public async Task<ActionResult<ApplicationRole>> ObtenerRol(int cod_rol)
        {
            var item = await _roleManager.FindByIdAsync(cod_rol.ToString());
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        //Mostrar roles de un empleado
        [HttpGet("ObtenerRolesUs/{cod_empleado}")]
        public  IActionResult ObtenerRolesUs(int cod_empleado)
        {
            var usuario = _userManager.Users.Where(x=> x.cod_empleado == cod_empleado).Select(x=> x.Id).FirstOrDefault();
           // int u=usuario;
            var roles =  from  ur in _context.UserRoles
                         join ro in _context.Roles on ur.RoleId equals ro.Id
                         where ur.UserId.Equals(usuario)
                         select new {
                             cod_usuario=ur.UserId,
                             cod_rol2=ur.RoleId,
                             nombre_rol=ro.Name
                         };
          
            return Ok(roles);
        }

        /******************************** AREA DE INSERCIONES NUEVAS ******************/
        //Asignacion de roles a usuario
        //PARAMETROS: cod_usuario, nombre de rol
        [HttpPost]
        [Route("AsignarRolesUsuario")]
        public async Task<IActionResult> AsignarRoles([FromBody] UserRole user_roles)
        {
            var usuario = await _userManager.FindByIdAsync(user_roles.cod_usuario.ToString());
            var rolesActuales = await _context.UserRoles.Where(x => x.UserId == usuario.Id).ToListAsync();

            if(usuario == null){
                return NotFound();
            }

            foreach (var item in rolesActuales) //Eliminando roles actuales
            {
                _context.UserRoles.Remove(item);
            }

            await _context.SaveChangesAsync();

            //Registrando nuevos roles
            foreach (var cod_rol in user_roles.cod_rol)
            {
                var rol = await _roleManager.Roles.Where(x => x.Id == cod_rol).FirstOrDefaultAsync();

                await _userManager.AddToRoleAsync(usuario, rol.Name.ToString());
            }
        
            return Ok();
        }


        /******************************AREA DE MODIFICACIONES*************************/

        //EDITAR ROL
        // PUT: api/account/editarRol/5
        [HttpPut("Editar/{cod_rol}")]
        public async Task<IActionResult> EditarRol(int cod_rol, ApplicationRole item)
        {
            if (cod_rol != item.Id)
            {
                return NotFound(new { message = "Rol no encontrado" });
            }

            var oldRole = await _roleManager.FindByIdAsync(cod_rol.ToString());

            oldRole.Name = item.Name.ToUpper();
            oldRole.habilitado = item.habilitado;
            oldRole.descripcion = item.descripcion;

            //var nuevoRol = new ApplicationRole {Id = item.Id, Name = item.Name, Description = item.Description, Habilitado = item.Habilitado };
            var result = await _roleManager.UpdateAsync(oldRole);

            if (!result.Succeeded)
            {
                return BadRequest();
            }
            return Ok();
        }       



    }
}