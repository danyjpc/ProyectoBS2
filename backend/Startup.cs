using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BdContext>(option =>
                option.UseMySql(Configuration.GetConnectionString("DefaultConnection"))
                );

            //Agregando servicio de cuentas de usuario por defecto de Microsoft
            services.AddIdentity<ApplicationUser, ApplicationRole>(options => 
            {
                options.Lockout.MaxFailedAccessAttempts = 8;
                //Cambiando restricciones de contraseña
                options.Password.RequiredLength = 8; //Num. caracteres requeridos
                options.Password.RequiredUniqueChars = 4; //Caracteres unicos requeridos
                options.Password.RequireLowercase = false; //Minusculas requeridas = false
                options.Password.RequireNonAlphanumeric = false; //caracter alfanumerico = false
                options.Password.RequireUppercase = false; //Mayusculas requeridas = false
                options.User.RequireUniqueEmail = true; //Email unico e irrepetible
            })

                .AddEntityFrameworkStores<BdContext>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);            

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters 
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration.GetSection("JWTStrings:Domain").ToString(),
                ValidAudience = Configuration.GetSection("JWTStrings:Domain").ToString(),
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("JWTStrings:KeySecret").ToString())),
                ClockSkew = TimeSpan.Zero
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(builder =>
            builder.WithOrigins("http://localhost:4200")
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
            
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();

            DatosPrecargados.Precargar(app.ApplicationServices);
        }
    }
}
