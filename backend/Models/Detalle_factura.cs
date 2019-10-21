using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_detalle_factura")]
    public class Detalle_factura
    {
        [Key]
        public int id_detalle_factura { get; set; }
        public int cantidad{get;set;}
        [ForeignKey("id_factura")]
        public int id_factura {get;set;}
        public Factura factura{get;set;}
        [ForeignKey("id_producto")]
        public int id_producto {get;set;}
        public Producto producto {get;set;}
    }
}