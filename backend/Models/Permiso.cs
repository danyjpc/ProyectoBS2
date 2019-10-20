using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Permiso
    {
       [Key]
       public int cod_permiso { get; set; } 
       [Column (TypeName="varchar(60)")]
       public string nom_permiso { get; set; }
       public int habilitado { get; set; }
       public List<PermisoRol> Permiso_Rol { get; set; }
    }
}