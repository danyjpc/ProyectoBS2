using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController: ControllerBase
    {
        public readonly BdContext _context;
        public InventarioController(BdContext bdContext){
            _context = bdContext;
        }

        [HttpGet]
        public async Task<ActionResult> obtenerProductos(){

            var items = await _context.Productos.Select(m => new {
                id_producto = m.id_producto,
                cod_producto = m.cod_producto,
                nom_producto = m.nom_producto,
                categoria = m.categoria.nombre,
                ventas = m.detalles_factura.Count != 0 ? m.detalles_factura.Where(df => df.id_producto == m.id_producto).Sum(a => a.cantidad) : 0,
                pedidos = m.detalles_kardex.Count != 0 ? m.detalles_kardex.Where(dk => dk.id_producto == m.id_producto && dk.kardex.validado == 1).Sum(a => a.cantidad) : 0
            }).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("pedidosproducto/{id_producto}")]
        public async Task<ActionResult> obtenerPedidosPorProducto(int id_producto){
            var items = await _context.Detalles_kardex.Where(dk => dk.id_producto == id_producto).Select(m => new {
                id_detalle_kardex = m.id_detalle_kardex,
                fecha_fac = m.kardex.fecha_fac,
                cod_producto = m.producto.cod_producto,
                nom_producto = m.producto.nom_producto,
                categoria = m.producto.categoria.nombre,
                cantidad = m.cantidad,
                precio_unitario = m.precio_unitario,
                validado = m.kardex.validado,
                tipo_operacion = m.kardex.tipo_operacion
            }).OrderBy(n => n.id_detalle_kardex).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("pedidosvalidados/{id_producto}")]
        public async Task<ActionResult> obtenerPedidosPorProductoValidados(int id_producto){
            var items = await _context.Detalles_kardex.Where(dk => dk.id_producto == id_producto && dk.kardex.validado == 1).Select(m => new {
                id_detalle_kardex = m.id_detalle_kardex,
                fecha_fac = m.kardex.fecha_fac,
                cod_producto = m.producto.cod_producto,
                nom_producto = m.producto.nom_producto,
                categoria = m.producto.categoria.nombre,
                cantidad = m.cantidad,
                precio_unitario = m.precio_unitario,
                validado = m.kardex.validado,
                tipo_operacion = m.kardex.tipo_operacion
            }).OrderBy(n => n.id_detalle_kardex).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("pedidosnovalidados/{id_producto}")]
        public async Task<ActionResult> obtenerPedidosPorProductoSinValidar(int id_producto){
            var items = await _context.Detalles_kardex.Where(dk => dk.id_producto == id_producto && dk.kardex.validado == 0).Select(m => new {
                id_detalle_kardex = m.id_detalle_kardex,
                fecha_fac = m.kardex.fecha_fac,
                cod_producto = m.producto.cod_producto,
                nom_producto = m.producto.nom_producto,
                categoria = m.producto.categoria.nombre,
                cantidad = m.cantidad,
                precio_unitario = m.precio_unitario,
                validado = m.kardex.validado,
                tipo_operacion = m.kardex.tipo_operacion
            }).OrderBy(n => n.id_detalle_kardex).ToArrayAsync();

            return Ok(items);
        }

        [HttpGet("detalleproducto/{id_producto}")]
        public async Task<ActionResult> obtenerDetallesProducto(int id_producto){
            var item = await _context.Productos.Where(p => p.id_producto == id_producto && p.habilitado == 1).Select(m => new{
                cod_producto = m.cod_producto,
                nom_producto = m.nom_producto,
                descripcion = m.descripcion,
                costo_compra = m.costo_compra,
                precio_unitario = m.precio_unitario,
                ventas = m.detalles_factura.Count != 0 ? m.detalles_factura.Where(df => df.id_producto == m.id_producto).Sum(a => a.cantidad) : 0,
                pedidos = m.detalles_kardex.Count != 0 ? m.detalles_kardex.Where(dk => dk.id_producto == m.id_producto && dk.kardex.validado == 1).Sum(a => a.cantidad) : 0,
                categoria = m.categoria.nombre
            }).FirstAsync();

            return Ok(item);
        }
        public int calcularExistencia(int id_producto){
            var detsKardex = _context.Detalles_kardex.Where(dk => dk.kardex.validado == 1 && dk.id_producto == id_producto)
            .Select(m => m.cantidad).ToList();

            var detsFactura = _context.Detalles_facturas.Where(dk => dk.id_producto == id_producto)
            .Select(m => m.cantidad).ToList();
            
            int totalKards = 0;
            int totalFacts = 0;

            for (int i = 0; i < detsKardex.Count; i++)
            {
                totalKards = totalKards + detsKardex.ElementAt(i);
            }

            for (int i = 0; i < detsFactura.Count; i++)
            {
                totalFacts = totalFacts + detsFactura.ElementAt(i);                
            }

            return (totalKards - totalKards);
        }
        
    }
}