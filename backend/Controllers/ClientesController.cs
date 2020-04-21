using System.Collections.Generic;
using System;
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
    public class ClientesController : ControllerBase
    {
        private readonly BdContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ClientesController(BdContext bdContext,  UserManager<ApplicationUser> userManager)
        {
            _context = bdContext;
            _userManager = userManager;
        }

        //Obtener todos los clientes
        [HttpGet]
        public async Task<ActionResult> ObtenerClientes()
        {
            var clientes = await _context.Personas.Where(x => x.habilitado && x.puesto == null).ToListAsync();
            return Ok(clientes);
        }

        //Inhabilitados
        [HttpGet("Inhabilitados")]
        public async Task<ActionResult> ObtenerClientesIN()
        {
            var clientes = await _context.Personas.Where(x => !x.habilitado && x.puesto == null).ToListAsync();
            return Ok(clientes);
        }

        //Obtner informacion de un cliente especifico
        [HttpGet("{id_cliente}")]
        public async Task<ActionResult<Persona>> ObtenerCliente(int id_cliente)
        {
            var cliente = await _context.Personas.FindAsync(id_cliente);

            if(cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        //Crear un cliente
        [HttpPost]
        public async Task<ActionResult<Persona>> CrearCliente([FromBody] Persona cliente)
        {
            _context.Personas.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObtenerCliente), new {id_cliente = cliente.id_persona}, cliente);
        }

        //Editar un cliente
        [HttpPut("{id_cliente}")]
        public async Task<ActionResult> EditarCliente(int id_cliente, Persona cliente)
        {
            if(id_cliente != cliente.id_persona)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}