using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_dimension")]
    public class Dimension
    {
        [Key]
        public int id_dimension { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string nombre_dimension { get; set; }
        public decimal valor { get; set; }
        [ForeignKey("id_producto")]
        public int id_producto { get; set; }
        public Producto producto { get; set; }
        [ForeignKey("id_unidad_medida")]
        public int id_unidad_medida { get; set; }
        public int habilitado { get; set; }
        public Unidad_medida unidad_medida { get; set; }
    }
}