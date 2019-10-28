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
    public class VentaController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly BdContext _context;

        public VentaController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //OBTENER PRODUCTOS
        //GET: api/producto/productos
        [HttpGet("dropproductos")]
        public async Task<ActionResult<IEnumerable<Producto>>> obtenerProductos()
        {
            var items = await _context.Productos.ToListAsync();
            return items;
        }

        [HttpGet("dropclientes")]
        public async Task<ActionResult<IEnumerable<Cliente>>> obtenerClientes()
        {
            var items = await _context.Clientes.ToListAsync();
            return items;
        }

        [HttpGet("getdetxprod")]
        public async Task<ActionResult<IEnumerable<Detalle_factura>>> obtenerDetalles()
        {
            var items = await _context.Detalles_facturas.ToListAsync();
            return items;
        }
        [HttpGet("getdetkxprod")]
        public async Task<ActionResult<IEnumerable<Detalle_kardex>>> obtenerDetallesK()
        {
            var items = await _context.Detalles_kardex.Where(dk => dk.kardex.validado == 1) .ToListAsync();
            return items;
        }

        [HttpPost]
        public async Task<ActionResult> crearFactura( Factura factura)
        {
            await _context.Facturas.AddAsync(factura);
            await _context.SaveChangesAsync();

            int id = factura.id_factura;

            var nuevaFactura = _context.Facturas.Where(x => x.id_factura == id);

            return Ok(nuevaFactura);
        }

        [HttpPost("adddetalle/{id_factura}")]
        public async Task<ActionResult> aniadirDetalle(Detalle_factura[] detalles, int id_factura)
        {
            for(int i=0; i<detalles.Length; i++)
            {
                detalles[i].id_factura = id_factura;
            await _context.Detalles_facturas.AddAsync(detalles[i]);
            await _context.SaveChangesAsync();

           // int id = detalles[i].id_detalle_factura;
            }

            return Ok(); //return id detalle_factura creada
        }




    }
}