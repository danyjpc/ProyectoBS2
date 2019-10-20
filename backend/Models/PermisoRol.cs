using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class PermisoRol
    {
        public int cod_rol { get; set; }
        [ForeignKey("cod_rol")]
        public ApplicationRole ApplicationRole { get; set; }
        
        public int cod_permiso { get; set; }
        [ForeignKey("cod_permiso")]
        public Permiso permiso { get; set; }
    }
}