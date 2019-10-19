using System.Collections.Generic;

namespace backend.Models
{
    public class UserRole
    {
        public int cod_usuario { get; set; }
        public List<int> cod_rol { get; set; }
    }
}