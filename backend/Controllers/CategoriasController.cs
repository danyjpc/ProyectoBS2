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
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CategoriasController : ControllerBase
    {
        private readonly BdContext _context;

        public CategoriasController(BdContext bdContext)
        {
            _context = bdContext;
        }

        //Obtener todas las categorias
        [HttpGet]
        public async Task<ActionResult> ObtenerCategorias()
        {
            var categorias = await _context.Categorias.ToListAsync();

            return Ok(categorias);
        }

        //Obtner informacion de una categoria especifica
        [HttpGet("{id_categoria}")]
        public async Task<ActionResult<Categoria>> ObtenerCategoria(int id_categoria)
        {
            var categoria = await _context.Categorias.FindAsync(id_categoria);

            if(categoria == null)
            {
                return NotFound();
            }

            return Ok(categoria);
        }

        //Crear una categoria
        [HttpPost]
        public async Task<ActionResult<Categoria>> CrearCategoria([FromBody] Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerCategoria), new {id_categoria = categoria.id_categoria}, categoria);
        }

        //Editar una categoria
        [HttpPut("{id_categoria}")]
        public async Task<ActionResult> EditarCategoria(int id_categoria, Categoria categoria)
        {
            if(id_categoria != categoria.id_categoria)
            {
                return BadRequest();
            }

            _context.Entry(categoria).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}