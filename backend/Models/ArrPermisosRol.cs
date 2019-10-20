using System.Collections.Generic;

namespace backend.Models
{
    public class ArrPermisosRol
    {
        public int cod_rol { get; set; }
        public List<int> cod_permisos { get; set; }
    }
}