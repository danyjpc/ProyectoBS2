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
    public class ClientesController : ControllerBase
    {
        private readonly BdContext _context;

        public ClientesController(BdContext bdContext)
        {
            _context = bdContext;
        }

        //Obtener todos los clientes
        [HttpGet]
        public async Task<ActionResult> ObtenerClientes()
        {
            var clientes = await _context.Clientes.ToListAsync();
            return Ok(clientes);
        }

        //Obtner informacion de un cliente especifico
        [HttpGet("{id_cliente}")]
        public async Task<ActionResult<Cliente>> ObtenerCliente(int id_cliente)
        {
            var cliente = await _context.Clientes.FindAsync(id_cliente);

            if(cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        //Crear un cliente
        [HttpPost]
        public async Task<ActionResult<Cliente>> CrearCliente([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerCliente), new {id_cliente = cliente.id_cliente}, cliente);
        }

        //Editar un cliente
        [HttpPut("{id_cliente}")]
        public async Task<ActionResult> EditarCliente(int id_cliente, Cliente cliente)
        {
            if(id_cliente != cliente.id_cliente)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}