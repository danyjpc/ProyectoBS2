using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Puesto
    {
        [Key]
        public int cod_puesto { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string nombre { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string descripcion { get; set; }
        public int habilitado { get; set; }

        public List<Empleado> Empleado { get; set; }
    }
}