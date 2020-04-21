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
   // [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

        //Productos con existencias < 20
        [HttpGet("stkmin")]
        public async Task<ActionResult<Producto[]>> StockMin()
        {
            var productos = await _context.Productos.Where(prod => prod.cantidad_existente < prod.stock_minimo).ToListAsync();
            return Ok(productos);
        }

        //5 Productos más vendidos
        [HttpGet("masvendidos")]
        public async Task<ActionResult<Detalle_factura[]>> MasVendidos()
        {
           /* var dts = await _context.Detalles_facturas.Select(
                det => new{
                    id_producto = det.id_producto,
                    nom_producto = det.producto.nom_producto,
                    cantidad = det.cantidad
                }
            ).GroupBy(de => de.id_producto).ToListAsync();
            dts.Sum(de => de.cantidad).OrderByDescending(de => de.cantidad);*/
            var dts2 = await _context.Detalles_facturas.GroupBy(de => de.id_producto).Select(
                det => new {
                    id_producto = det.ElementAt(0).id_producto,
                   // nom_producto = det.ElementAt(0).producto.nom_producto,
                    cantidad = det.Sum(n => n.cantidad)
                }
            ).Join(_context.Productos, 
                d => d.id_producto, 
                p => p.id_producto,
                (d, p) => new {
                    id_producto = d.id_producto, 
                    nom_producto = p.nom_producto, 
                    cantidad = d.cantidad
                }
            ).OrderByDescending(dt => dt.cantidad).Take(3).ToListAsync();
           // dts.Sum(de => de.cantidad).GroupBy(de => de.id_producto).OrderByDescending(de => de.cantidad);
            return Ok(dts2);

          /*  var productos = await _context.Productos.Select().ToListAsync();
            productos.Top(pro => pro.cantidad_existente);*/
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

        //Obtener los productos por categoria
        [HttpGet("cat/{id_categoria}")]
        public async Task<ActionResult> ObtenerProductoC(int id_categoria)
        {
            var items = await _context.Productos.Where(c=> c.categoria.id_categoria==id_categoria).ToListAsync();
            return Ok(items);
        }
    }
}