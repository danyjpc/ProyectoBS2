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
    public class ProveedoresController : ControllerBase
    {
        private readonly BdContext _context;

        public ProveedoresController(BdContext bdContext)
        {
            _context = bdContext;
        }

        //Obtener todos los proveedores
        [HttpGet]
        public async Task<ActionResult> ObtenerProveedores()
        {
            var proveedores = await _context.Proveedores.ToListAsync();

            return Ok(proveedores);
        }

        //Obtner informacion de un proveedor especifico
        [HttpGet("{id_proveedor}")]
        public async Task<ActionResult<Cliente>> ObtenerProveedor(int id_proveedor)
        {
            var proveedor = await _context.Proveedores.FindAsync(id_proveedor);

            if(proveedor == null)
            {
                return NotFound();
            }

            return Ok(proveedor);
        }

        //Crear un proveedor
        [HttpPost]
        public async Task<ActionResult<Proveedor>> CrearProveedor([FromBody] Proveedor proveedor)
        {
            _context.Proveedores.Add(proveedor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerProveedor), new {id_proveedor = proveedor.id_proveedor}, proveedor);
        }

        //Editar un proveedor
        [HttpPut("{id_proveedor}")]
        public async Task<ActionResult> EditarProveedor(int id_proveedor, Proveedor proveedor)
        {
            if(id_proveedor != proveedor.id_proveedor)
            {
                return BadRequest();
            }

            _context.Entry(proveedor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //La propiedad eliminar no está, solo se modificará el estado "habilitado", con la funcion de EditarProveedor
    }
}