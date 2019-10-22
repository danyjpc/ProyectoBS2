using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("kardex")]
    public class Kardex
    {
        [Key]
        public int id_kardex { get; set; }
        [Column(TypeName = "date")]
        public DateTime fecha_fac { get; set; }
        public int num_factura { get; set; }

        [Column(TypeName = "varchar(45)")]
        public string serie_factura { get; set; }
        [Column(TypeName = "tinyint")]
        public byte tipo_operacion{get;set;}
        public byte validado {get; set;}

       [ForeignKey("id_proveedor")]
        public int id_proveedor { get; set; }
        public Proveedor proveedor{ get; set; }

        public List<Detalle_kardex> detalles_kardex {get;set;}
    }
}