using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Empleado
    {
        [Key]
        public int cod_empleado { get; set; }
        [Column (TypeName="varchar(100)")]
        public string nombre { get; set; }
        [Column (TypeName="varchar(250)")]
        public string direccion { get; set; }
        [Column (TypeName="varchar(13)")]
        public string dpi { get; set; }
        public int estado_activo { get; set; }

        public ApplicationUser usuario { get; set; }
    }
}