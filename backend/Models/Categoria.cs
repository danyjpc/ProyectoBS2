using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_categoria")]
    public class Categoria
    {
        [Key]
        public int id_categoria { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string nombre { get; set; }
        [Column(TypeName = "varchar(150)")]
        public string descripcion { get; set; }
        public List<Producto> productos{get;set;}
    }
}