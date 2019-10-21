using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UnidadMedidasController : ControllerBase
    {
        private readonly BdContext _context;

        public UnidadMedidasController(BdContext bdContext)
        {
            _context = bdContext;
        }

        //Obtener todas las unidades de medida
        [HttpGet]
        public async Task<ActionResult> ObtenerUnidadMedidas()
        {
            var unidad_medidas = await _context.Unidad_Medidas.ToListAsync();
            return Ok(unidad_medidas);
        }

        //Obtner informacion de una unidad de medida especifica
        [HttpGet("{id_unidad_medida}")]
        public async Task<ActionResult<Unidad_medida>> ObtenerUnidadMedida(int id_unidad_medida)
        {
            var unidad_medida = await _context.Clientes.FindAsync(id_unidad_medida);

            if(unidad_medida == null)
            {
                return NotFound();
            }
            return Ok(unidad_medida);
        }

        //Crear una unidad de medida
        [HttpPost]
        public async Task<ActionResult<Unidad_medida>> CrearUnidadMedida([FromBody] Unidad_medida unidad_medida)
        {
            _context.Unidad_Medidas.Add(unidad_medida);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerUnidadMedida), new {id_unidad_medida = unidad_medida.id_unidad_medida}, unidad_medida);
        }

        //Editar una unidad de medida
        [HttpPut("{id_unidad_medida}")]
        public async Task<ActionResult> EditarUnidadMedida(int id_unidad_medida, Unidad_medida unidad_medida)
        {
            if(id_unidad_medida != unidad_medida.id_unidad_medida)
            {
                return BadRequest();
            }

            _context.Entry(unidad_medida).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}