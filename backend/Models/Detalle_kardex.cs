using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("detalle_kardex")]
    public class Detalle_kardex
    {
        [Key]
        public int id_detalle_kardex { get; set; }
        public int cantidad {get;set;}
        public decimal precio_unitario{get;set;}
        [ForeignKey("id_kardex")]
        public int id_kardex {get;set;}
        public Kardex karxex {get;set;}
        [ForeignKey("id_producto")]
        public int id_producto {get;set;}
        public Producto producto {get;set;}
    }

}