namespace backend.Models
{
    public class UserInfo
    {
        public int cod_empleado { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string password_confirmar { get; set; }
        public int estado_activo { get; set; }
    }
}