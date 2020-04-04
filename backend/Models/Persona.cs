using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace backend.Models
{
    [Table("tb_persona")]
    public class Persona
    {
        [Key]
        public int id_persona {get;set;}
        [Column(TypeName="varchar(120)")]
        public string nom_persona{get;set;}
        [Column(TypeName="varchar(13)")]
        public string dpi{get;set;}
        [Column(TypeName="varchar(150)")]
        public string direccion{get;set;}
        [Column(TypeName="varchar(8)")]
        public string telefono{get;set;}
        [Column(TypeName="varchar(10)")]
        public string nit{get;set;}
        public bool habilitado {get;set;}
        [ForeignKey("id_puesto")]
        public int? id_puesto {get;set;}
        public Puesto puesto {get;set;}
        public List<ApplicationUser> usuarios {get;set;}
    }
}