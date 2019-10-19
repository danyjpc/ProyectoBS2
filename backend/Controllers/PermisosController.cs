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
    public class PermisosController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly BdContext _context;

        public PermisosController(UserManager<ApplicationUser> userManager, BdContext bdContext)
        {
            _userManager = userManager;
            _context = bdContext;
        }

        //Lista de todos permisos
        [HttpGet]
        public async Task<List<Permiso>> ObtenerPermisos()
        {
            var permisos = await _context.Permisos.ToListAsync();
            return permisos;
        }

        //Permisos del rol de un usuario
        [HttpGet("{email}")]
        public async Task<List<Permiso>> ObtenerPermisosUsuario(string email)
        {
            var usuario = await _userManager.FindByEmailAsync(email);

            var rolesUs = await _context.UserRoles.Where(x => x.UserId == usuario.Id).ToListAsync();

            List<Permiso> permisos = null;

            foreach (var rol in rolesUs)
            {
                var perm = await _context.Permisos_rol.Where(x => x.cod_rol == rol.RoleId).Select(x => x.cod_permiso).FirstOrDefaultAsync();

                var permiso = await _context.Permisos.Where(x => x.cod_permiso == perm).FirstOrDefaultAsync();

                permisos.Add(permiso);
            }

            return permisos;
        }

        //Obtener permisos de un rol
        [HttpGet]
        [Route("Role/{cod_rol}")]
        public async Task<List<Permiso>> ObtenerPermisosRol(int cod_rol)
        {
            var cod_permisos = await _context.Permisos_rol.Where(x => x.cod_rol == cod_rol).Select(x => x.cod_permiso).ToListAsync();

            List<Permiso> permisos = null;

            foreach (var cod_perm in cod_permisos)
            {
                var perm = await _context.Permisos.Where(x => x.cod_permiso == cod_perm).FirstOrDefaultAsync();

                permisos.Add(perm);
            }

            return permisos;
        }

        //Crear permiso
        [HttpPost]
        public async Task<IActionResult> CrearPermiso([FromBody] Permiso permiso)
        {
            var acceso = new Permiso { nom_permiso = permiso.nom_permiso.ToUpper()};
            _context.Permisos.Add(acceso);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Permiso creado exitosamente" });
        }

        //Asignar permisos a un rol
        [HttpPost]
        [Route("AsignarARol")]
        public async Task<IActionResult> AsignarPermisoRol([FromBody] ArrPermisosRol permisos_rol)
        {
            var permisosOld = await _context.Permisos_rol.Where(x => x.cod_rol == permisos_rol.cod_rol).ToListAsync();

            foreach (var perm in permisosOld) //Eliminar anteriores permisos
            {
                _context.Permisos_rol.Remove(perm);
            }

            //Agregar nuevos permisos
            foreach (int cod_permiso in permisos_rol.cod_permisos)
            {
                _context.Permisos_rol.Add(new PermisoRol { cod_rol = permisos_rol.cod_rol, cod_permiso = cod_permiso });
            }
            await _context.SaveChangesAsync();

            return Ok(new { message = "Permisos asignados correctamente" });
        }   

        [HttpPut("{cod_permiso}")]
        public async Task<IActionResult> DeshabilitarPermiso(int cod_permiso, Permiso permiso){
            if(cod_permiso != permiso.cod_permiso)
            {
                return BadRequest();
            }

            var permisoActual = await _context.Permisos.Where(x => x.cod_permiso == cod_permiso).FirstOrDefaultAsync();
            permisoActual.nom_permiso = permiso.nom_permiso;
            permisoActual.habilitado = permiso.habilitado;
            _context.Entry(permiso).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new {message = "Permiso modificado correctamente"});
        }
    }
}