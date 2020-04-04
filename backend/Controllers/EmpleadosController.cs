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
        public async Task<List<Persona>> obtenerPersonasHabilitadas()
        {
            var personas = await _context.Personas.Where(x => x.habilitado && x.nit == null).ToListAsync();
            return personas;
        }

        //OBTENER PERSONAS DESHABILITADAS
        //GET: api/Personas/Deshabilitado
        [Route("Deshabilitado")]
        [HttpGet]
        public async Task<List<Persona>> obtenerPersonasDeshabilitadas()
        {
            var personas = await _context.Personas.Where(x => !x.habilitado && x.nit == null).ToListAsync();
            return personas;
        }

        //Obtener a un empleado por su codigo
        [HttpGet("{cod_empleado}")]
        public async Task<ActionResult<Persona>> getItem(int cod_empleado)
        {

            var item = await _context.Personas.FindAsync(cod_empleado);
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
        public async Task<ActionResult> crearEmpleado([FromBody] Persona empleado)
        {
            await _context.Personas.AddAsync(empleado);
            await _context.SaveChangesAsync();

            int id = empleado.id_persona;

            var nuevoEmpleado = _context.Personas.Where(x => x.id_persona == id);

            return Ok(nuevoEmpleado); //Retorn Id de usuario creado
        }

        //EDITAR EMPLEADO
        //Si su estado activo se deshabilita, tambien se deshabilitará su cuenta de usuario.
        //PUT: api/Personas/4
        [HttpPut("{cod_empleado}")]
        public async Task<IActionResult> editarPersona(int cod_empleado, Persona empleado)
        {
            if (cod_empleado != empleado.id_persona)
            {
                return BadRequest();
            }

            var empleadoOld = _context.Personas.Where(x => x.id_persona == cod_empleado).FirstOrDefault();

            if (empleadoOld != null) //Si la persona tiene una cuenta de usuario
            {
                empleadoOld.nom_persona = empleado.nom_persona;
                empleadoOld.direccion = empleado.direccion;
                empleadoOld.dpi = empleado.dpi;
                empleadoOld.id_puesto= empleado.id_puesto;
                empleadoOld.habilitado = empleado.habilitado;

                _context.Entry(empleadoOld).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

    }
}