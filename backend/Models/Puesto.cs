using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_puesto")]
    public class Puesto
    {
        [Key]
        public int id_puesto { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string nombre  {get;set;}
        [Column(TypeName = "varchar(120)")]
        public string descripcion {get;set;}
        public List<Empleado> empleados{get;set;}
    }
}