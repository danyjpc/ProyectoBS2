using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System;

namespace backend.Models
{
    public class ApplicationUser: IdentityUser<int>
    {
        [Key]
        public int id_usuario { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string nom_usuario {get;set;}
        [Column(TypeName = "varchar(45)")]
        public string password {get;set;}
        [ForeignKey("id_persona")]
        public int id_persona {get;set;}
        public Persona persona { get; set; }
        [Column(TypeName="date")]
        public DateTime fecha_registro {get;set;}
        [ForeignKey("id_rol")]
        public int id_rol {get;set;}
        public int estado_activo { get; set; }
        public List<Factura> facturas {get;set;}
    }
}