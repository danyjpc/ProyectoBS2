using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly BdContext _context;

        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, BdContext bdContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //[AllowAnonymous]
        [Route("CrearUsuario")]
        [HttpPost]
        public async Task<IActionResult> CrearUsuario([FromBody] UserInfo datos)
        {

            if(!datos.password.Equals(datos.password_confirmar))
            {
                return BadRequest(new {message = "Contraseñas no coinciden"});
            }

            var user = new ApplicationUser {cod_empleado = datos.cod_empleado, UserName = datos.email, Email = datos.email, estado_activo = 1};

            var result = await _userManager.CreateAsync(user, datos.password);

            if(result.Succeeded)
            {
                return BuildToken(datos);
            }
            else{
                return BadRequest(new {message = "Error al crear usuario"});
            }
        }

        /************ AREA DE CONSTRUCCION DE TOKENS xD*******/
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserInfo userInfo)
        {
            if(ModelState.IsValid)
            {
                var usuario = await _userManager.FindByEmailAsync(userInfo.email);

                var result = await _signInManager.PasswordSignInAsync(userInfo.email, userInfo.password, true, true);

                if(result.Succeeded)
                {
                    return BuildToken(userInfo); //Construir token
                }
                else{
                    return BadRequest(new {message = "Error al iniciar sesion"});
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //Metodo para la construccion del token, a partir de la informacion del usuario
        private IActionResult BuildToken(UserInfo userInfo)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.email), //Identificador del usuario
                new Claim("valor", "sistemas"),
                //Generador de cadena grande
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //LLave de seguridad
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWTStrings:KeySecret").ToString()));

            //Credenciales
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //Expiracion del token
            var exp = DateTime.UtcNow.AddHours(1);

            //Construyendo objeto token
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration.GetSection("JWTStrings:Domain").ToString(),
                audience: _configuration.GetSection("JWTStrings:Domain").ToString(),
                claims: claims,
                expires: exp,
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = exp
            });
        }
    }
}