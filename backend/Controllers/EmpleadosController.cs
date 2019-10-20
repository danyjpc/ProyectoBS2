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
    public class EmpleadosController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly BdContext _context;

        public EmpleadosController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //OBTENER EMPLEADOS HABILITADOS
        //GET: api/Empleados/Habilitado
        [Route("Habilitado")]
        [HttpGet]
        public async Task<List<Empleado>> obtenerPersonasHabilitadas()
        {
            var personas = await _context.Empleados.Where(x => x.estado_activo == 1).ToListAsync();
            return personas;
        }

        //OBTENER PERSONAS DESHABILITADAS
        //GET: api/Personas/Deshabilitado
        [Route("Deshabilitado")]
        [HttpGet]
        public async Task<List<Empleado>> obtenerPersonasDeshabilitadas()
        {
            var personas = await _context.Empleados.Where(x => x.estado_activo == 0).ToListAsync();
            return personas;
        }

        //Obtener a un empleado por su codigo
        [HttpGet("{cod_empleado}")]
        public async Task<ActionResult<Empleado>> getItem(int cod_empleado)
        {

            var item = await _context.Empleados.FindAsync(cod_empleado);
            //DateTime fecha= new System.DateTime(item.fecha_nacimiento.Day, item.fecha_nacimiento.Month, item.fecha_nacimiento.Year);

            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //CREAR EMPLEADO
        //POST: api/Empleados
        [HttpPost]
        public async Task<ActionResult> crearEmpleado([FromBody] Empleado empleado)
        {
            await _context.Empleados.AddAsync(empleado);
            await _context.SaveChangesAsync();

            int id = empleado.cod_empleado;

            var nuevoEmpleado = _context.Empleados.Where(x => x.cod_empleado == id);

            return Ok(nuevoEmpleado); //Retorn Id de usuario creado
        }

        //EDITAR EMPLEADO
        //Si su estado activo se deshabilita, tambien se deshabilitará su cuenta de usuario.
        //PUT: api/Personas/4
        [HttpPut("{cod_empleado}")]
        public async Task<IActionResult> editarPersona(int cod_empleado, Empleado empleado)
        {
            if (cod_empleado != empleado.cod_empleado)
            {
                return BadRequest();
            }

            var empleadoOld = _context.Empleados.Where(x => x.cod_empleado == cod_empleado).FirstOrDefault();

            if (empleadoOld != null) //Si la persona tiene una cuenta de usuario
            {
                empleadoOld.nombre = empleado.nombre;
                empleadoOld.direccion = empleado.direccion;
                empleadoOld.dpi = empleado.dpi;
                empleadoOld.estado_activo = empleado.estado_activo;

                _context.Entry(empleadoOld).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

    }
}