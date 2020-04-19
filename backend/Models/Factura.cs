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
        [Column(TypeName = "varchar(60)")]
        public string modo_envio { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string modo_pago { get; set; }
        [Column(TypeName = "tinyint")]
        public byte estado {get;set;}
        [ForeignKey("id_usu_cliente")]
        public int id_usu_cliente {get;set;}
        public ApplicationUser usuario_cliente {get;set;}
        [ForeignKey("id_usu_empleado")]
        public int? id_usu_empleado {get;set;}
        public ApplicationUser usuario_empleado {get;set;}
     /*   [ForeignKey("id_cliente")]
        //quitar clientes porque ahora son usuarios
        public int id_cliente {get;set;}//quitar
        public Cliente cliente{get;set;}//quitar
        [ForeignKey("id_empleado")]
        //quitar empleados porque ahora son usuarios
        public int id_empleado {get;set;}//quitar
        public Empleado empleado {get;set;}//quitar*/
        public int habilitado { get; set; }
        public decimal total {get;set;}

        public List<Detalle_factura> detalles_factura{get;set;}
    }
}