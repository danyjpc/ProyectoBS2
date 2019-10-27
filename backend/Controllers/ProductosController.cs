using System.Linq;
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
    public class ProductosController : ControllerBase
    {
        BdContext _context;
        public ProductosController(BdContext _bdContext)
        {
            _context = _bdContext;
        }

        //Obtener todos los productos
        [HttpGet]
        public async Task<ActionResult> ObtenerProductos()
        {
            var productos = await _context.Productos.ToListAsync();
            return Ok(productos);
        }

        //Obtener informacion de un producto especifico
        [HttpGet("{id_producto}")]
        public async Task<ActionResult<Producto>> ObtenerProducto(int id_producto)
        {
            var producto = await _context.Productos.FindAsync(id_producto);

            if(producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        //Crear nuevo producto
        [HttpPost]
        public async Task<ActionResult<Producto>> CrearProducto([FromBody] Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerProducto), new {id_producto = producto.id_producto}, producto);
        }

        //Editar producto
        [HttpPut("{id_producto}")]
        public async Task<IActionResult> EditarProducto(int id_producto, Producto producto)
        {
            if(id_producto != producto.id_producto)
            {
                return BadRequest();
            }

            _context.Entry(producto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Crear un registro de dimensión
        [HttpPost("dimension")]
        public async Task<ActionResult<Producto>> CrearDimension([FromBody] Dimension dimension)
        {
            _context.Dimensiones.Add(dimension);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}