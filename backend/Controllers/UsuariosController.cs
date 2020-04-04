using System;
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
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly BdContext _context;

        public UsuariosController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //Ver todos los usuarios
        [HttpGet]
        public async Task<List<ApplicationUser>> ObtenerUsuarios()
        {
            var usuarios = await _userManager.Users.Select(x => new ApplicationUser
            {
                Id = x.Id,
                Email = x.Email
            }).ToListAsync();

            return usuarios;
        }

        //Ver usuarios habilitados
        [Route("Habilitado")]
        [HttpGet]
        public async Task<List<ApplicationUser>> ObtenerUsuariosHabilitados()
        {
            var usuarios = await _userManager.Users.Where(x => x.estado_activo == 1).ToListAsync();

            return usuarios;
        }

        //Ver usuarios habilitados
        [Route("Deshabilitado")]
        [HttpGet]
        public async Task<List<ApplicationUser>> UsuariosDeshabilitados()
        {
            var usuarios = await _userManager.Users.Where(x => x.estado_activo == 0).ToListAsync();

            return usuarios;
        }

        //METODO que devuelve el Id de Empleado, con el email de usuario
        [Route("Empleado/{email}")]
        [HttpGet]
        public async Task<Int16> ObtenerIdPersona(string email)
        {
            var idPersona = await _userManager.Users.Where(x => x.Email == email).Select(y => y.id_persona).FirstOrDefaultAsync();

            return Convert.ToInt16(idPersona);
        }

        //Editar usuario
        [HttpPut]
        [Route("Editar/{cod_usuario}")]
        public async Task<IActionResult> EditarUsuario(int cod_usuario, UserInfo userInfo)
        {
            var oldUser = await _userManager.FindByIdAsync(cod_usuario.ToString());

            if (oldUser == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            if (userInfo.email != null)
            {
                oldUser.UserName = userInfo.email;
                oldUser.Email = userInfo.email;
                oldUser.NormalizedUserName = userInfo.email.ToUpper();
                oldUser.NormalizedEmail = userInfo.email.ToUpper();
                oldUser.estado_activo = userInfo.estado_activo;
            }

            if ((userInfo.password != null) && (userInfo.password_confirmar == userInfo.password))
            {
                await _userManager.RemovePasswordAsync(oldUser);
                await _userManager.AddPasswordAsync(oldUser, userInfo.password);
            }

            var result = await _userManager.UpdateAsync(oldUser);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            return Ok();
        }
        //Editar Contraseña
        [HttpGet]
        [Route("CodUser/{cod_empleado}")]
        public async Task<IActionResult> UsuarioCod(int cod_empleado)
        {
            var user = await _context.Users.Where(x => x.id_persona == cod_empleado).ToListAsync();

            return Ok(user[0]);
        }

        //Editar Contraseña
        [HttpPut]
        [Route("EditarPassword/{email}")]
        public async Task<IActionResult> EditarPassword(string email, CambioPass userInfo)
        {
            var user = await _userManager.FindByNameAsync(email);

            if (!email.Equals(userInfo.Email) || user == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            if (!userInfo.PasswordNuevo.Equals(userInfo.PasswordConfirmar))
            {
                return BadRequest(new { message = "Contraseñas no coinciden" });
            }

            var result = await _userManager.ChangePasswordAsync(user, userInfo.PasswordAnterior, userInfo.PasswordNuevo);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Error al cambiar contraseña" });
            }
            
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);
            return Ok();
        }


        
    }


    
}