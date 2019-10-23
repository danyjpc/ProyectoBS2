using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController: ControllerBase 
    {
        private readonly BdContext _context;
        public PedidosController(BdContext bdContext)
        {
            _context = bdContext;
        }

        // GET: api/tareas
        [HttpGet]
        public async Task<ActionResult> obtenerPedidos()
        {
            var items = await _context.Kardexs.Select(m => new {
                id_kardex = m.id_kardex,
                fecha_fac = m.fecha_fac,
                num_factura = m.num_factura,
                serie_factura = m.serie_factura,
                tipo_operacion = m.tipo_operacion,
                validado = m.validado,
                id_proveedor = m.id_proveedor,
                nom_proveedor = m.proveedor.nom_proveedor,
            }).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("proveedores")]
        public async Task<ActionResult> obtenerProveedores(){
            var items = await _context.Proveedores.Where(p => p.habilitado == 1).ToArrayAsync();
            return Ok(items);
        }

        [HttpGet("productos")]
        public async Task<ActionResult> obtenerProductos(){
            var items = await _context.Productos.Where(p => p.habilitado == 1).Select(m => new{
                id_producto = m.id_producto,
                cod_producto = m.cod_producto,
                nom_producto = m.nom_producto,
                descripcion = m.descripcion,
                costo_compra = m.costo_compra,
                precio_unitario = m.precio_unitario,
                habilitado = m.habilitado,
                categoria = m.categoria.nombre
            }).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("obtenerkardex/{id_kardex}")]
        public async Task<ActionResult> obtenerKardex(int id_kardex){
            var item = await _context.Kardexs.FindAsync(id_kardex);

            if(item == null){
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("guardarkardex")]
        public async Task<ActionResult> guardarKardex(Kardex item){
            _context.Kardexs.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(obtenerKardex), new {id_kardex = item.id_kardex}, item);
        }

        [HttpGet("obtenerdetallekardex/{id_detalle_kardex}")]
        public async Task<ActionResult> obtenerDetalleKardex(int id_detalle_kardex){
            var item = await _context.Detalles_kardex.FindAsync(id_detalle_kardex);

            if(item == null){
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost("guardardetallekardex")]
        public async Task<ActionResult> guardarDetalleKardex(Detalle_kardex item){
            _context.Detalles_kardex.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(obtenerDetalleKardex), new {id_detalle_kardex = item.id_detalle_kardex}, item);
        }

        [HttpPut("validarkardex/{id_kardex}")]
        public async Task<ActionResult> validarKardex(int id_kardex, Kardex item){
            if(id_kardex != item.id_kardex){
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("obtenerdetallespedidos/{id_kardex}")]
        public async Task<ActionResult> obtenerDetallesPedido(int id_kardex){
            var items = await _context.Detalles_kardex.Where(dk => dk.id_kardex == id_kardex).Select(m => new {
                id_detalle_kardex = m.id_detalle_kardex,
                cantidad = m.cantidad,
                precio_unitario = m.precio_unitario,
                id_kardex = m.id_kardex,
                id_producto = m.id_producto,
                nom_producto = m.producto.nom_producto,
                cod_producto = m.producto.cod_producto,
                categoria = m.producto.categoria.nombre
            }).ToArrayAsync();

            return Ok(items);
        }

        [HttpDelete("eliminardetalle/{id_detalle_kardex}")]
        public async Task<ActionResult> eliminarDetalleKardex(int id_detalle_kardex){
            var item = await _context.Detalles_kardex.FindAsync(id_detalle_kardex);
            if(item == null)
            {
                return NotFound();
            }

            _context.Detalles_kardex.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("editardetalle/{id_detalle_kardex}")]
        public async Task<ActionResult> editarDetalle(int id_detalle_kardex, Detalle_kardex item){
            if(id_detalle_kardex != item.id_detalle_kardex){
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("actualizarkardex/{id_kardex}")]
        public async Task<ActionResult> actualizarKardex(int id_kardex, Kardex item){
            if(id_kardex != item.id_kardex){
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("verificarvalidacion/{id_kardex}")]
        public async Task<ActionResult> verificarValidacion(int id_kardex){
            var items = await _context.Detalles_kardex.Where(dk => dk.id_kardex == id_kardex).ToArrayAsync();

            return Ok(items.Length != 0);
        }
    }
}