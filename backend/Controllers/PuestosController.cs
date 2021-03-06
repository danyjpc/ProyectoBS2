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
    public class PuestosController : ControllerBase
    {
        private readonly BdContext _context;
         private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public PuestosController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //Buscar un puesto [Recibe como parametro el codigo de puesto]
        //GET: api/puesto/5
        [HttpGet("{cod_puesto}")]
        public async Task<ActionResult<Puesto>>  obtenerPuesto(int cod_puesto)
        {
            var puesto = await _context.Puestos.FindAsync(cod_puesto);          
            if (puesto == null)
            {
                return NotFound();
            }
            return puesto;
        }

        //Obtener todos los puestos
        //GET: api/puesto/
        [HttpGet]
        public async Task<List<Puesto>> obtenerPuestos()
        {
            return await _context.Puestos.ToListAsync();
        }

        //OBTENER Puestos DESHABILITADAS
        //GET: api/Personas/Deshabilitado
        [Route("Deshabilitado")]
        [HttpGet]
        public async Task<List<Puesto>> obtenerPersonasDeshabilitadas()
        {
            var personas = await _context.Puestos.Where(x => x.habilitado == 0).ToListAsync();
            return personas;
        }

        //OBTENER Puestos DESHABILITADAS
        //GET: api/Personas/Deshabilitado
        [Route("habilitado")]
        [HttpGet]
        public async Task<List<Puesto>> obtenerPersonashabilitadas()
        {
            var personas = await _context.Puestos.Where(x => x.habilitado == 1).ToListAsync();
            return personas;
        }
          
        //Crear nuevo puesto
        //POST: api/puesto
        [HttpPost]
        public async Task<IActionResult> crearPuesto([FromBody] Puesto puesto){
            puesto.nombre = chrEspeciales(puesto.nombre); 
            await _context.Puestos.AddAsync(puesto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //Modificar puesto
        // PUT: api/puesto/5
        [HttpPut("{cod_puesto}")]
        public async Task<IActionResult> editarPuesto(int cod_puesto, Puesto puesto)
        {
            if (cod_puesto != puesto.cod_puesto)
            {
                return BadRequest();
            }

            puesto.nombre = chrEspeciales(puesto.nombre); 
            puesto.descripcion = chrEspeciales(puesto.descripcion);
            _context.Entry(puesto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public string chrEspeciales(string cad)
        {
            string sust = "";
            char car;
            if(cad != null)
            {
                cad = cad.ToUpper();
                foreach(char ltr in cad)
                {
                    switch(ltr)
                    {
                        case 'Á':
                            car = 'A';
                            break;
                        case 'É':
                            car = 'E';
                            break; 
                        case 'Í':
                            car = 'I';
                            break;                       
                        case 'Ó':
                            car = 'O';
                            break; 
                        case 'Ú':
                            car = 'U';
                            break;                        
                        default:
                            car = ltr;
                            break; 
                    }
                    sust = sust + car;
                }
            }
            return sust;
        }
    }
}