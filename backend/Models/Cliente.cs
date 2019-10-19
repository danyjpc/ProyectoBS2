using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_cliente")]
    public class Cliente
    {
        [Key]
        public int id_cliente { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string nom_cliente  {get;set;}
        [Column(TypeName = "varchar(100)")]
        public string direccion {get;set;}
        [Column(TypeName = "varchar(8)")]
        public string telefono {get;set;}
        public List<Factura> facturas{get;set;}
    }
}