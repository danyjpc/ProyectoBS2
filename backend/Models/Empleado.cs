using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_empleado")]
    public class Empleado
    {
        [Key]
        public int id_empleado { get; set; }
        [Column(TypeName = "varchar(120)")]
        public string nombre  {get;set;}
        [Column(TypeName = "varchar(15)")]
        public string dpi {get;set;}
        [ForeignKey("id_puesto")]
        public int id_puesto {get;set;}
        public Puesto puesto{get;set;}

        public List<Factura> facturas{get;set;}
    }
}