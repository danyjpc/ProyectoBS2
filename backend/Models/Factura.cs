using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_factura")]
    public class Factura
    {
        [Key]
        public int id_factura { get; set; }
        [Column(TypeName = "date")]
        public DateTime fecha {get;set;}
        [Column(TypeName = "tinyint")]
        public byte estado {get;set;}
        [ForeignKey("id_cliente")]
        public int id_cliente {get;set;}
        public Cliente cliente{get;set;}
        [ForeignKey("id_empleado")]
        public int id_empleado {get;set;}
        public Empleado empleado {get;set;}
        public int habilitado { get; set; }

        public List<Detalle_factura> detalles_factura{get;set;}
    }
}