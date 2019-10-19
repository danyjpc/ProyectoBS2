using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class ApplicationRole: IdentityRole<int>
    {
        public string descripcion { get; set; }
        public int habilitado { get; set; }
        
    }
}