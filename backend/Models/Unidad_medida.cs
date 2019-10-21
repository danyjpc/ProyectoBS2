using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_unidad_medida")]
    public class Unidad_medida
    {
        [Key]
        public int id_unidad_medida { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string nom_unidad{get;set;}
        [Column(TypeName = "varchar(10)")]
        public string abreviatura{get;set;}
        public int habilitado { get; set; }
        public List<Dimension> dimensiones{get;set;}
    }
}