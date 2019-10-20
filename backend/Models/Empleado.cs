using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{

    public class Empleado
    {
        [Key]
        public int cod_empleado { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string nombre { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string direccion { get; set; }
        [Column(TypeName = "varchar(13)")]
        public string dpi { get; set; }
        public int estado_activo { get; set; }
        public int cod_puesto { get; set; }
        [ForeignKey("cod_puesto")]
        public Puesto puesto { get; set; }
        public List<Factura> facturas { get; set; }
        public ApplicationUser usuario { get; set; }


    }
}