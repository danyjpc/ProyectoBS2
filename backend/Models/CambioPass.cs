namespace backend.Models
{
    public class CambioPass
    {
        public string Email { get; set; }
        public string PasswordAnterior { get; set; }
        public string PasswordNuevo { get; set; }   
        public string PasswordConfirmar { get; set; }
    }
}