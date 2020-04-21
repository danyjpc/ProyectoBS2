using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System;

namespace backend.Models
{
    public class ApplicationUser: IdentityUser<int>
    {       
        [ForeignKey("id_persona")]
        public int id_persona {get;set;}
        public Persona persona { get; set; }

        [Column(TypeName="date")]
        public DateTime fecha_registro {get;set;}     
        public int estado_activo { get; set; }
        public List<Factura> facturas_cliente {get;set;}
        public List<Factura> facturas_empleado {get;set;}

    }
}