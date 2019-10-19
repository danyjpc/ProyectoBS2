using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class ApplicationUser: IdentityUser<int>
    {
        public int cod_empleado { get; set; }
        [ForeignKey("cod_empleado")]
        public Empleado empleado { get; set; }
        
        public int estado_activo { get; set; }
    }
}