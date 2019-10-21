using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_proveedor")]
    public class Proveedor
    {
        [Key]
        public int id_proveedor { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string nom_proveedor { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string direccion { get; set; }
        [Column(TypeName = "varchar(8)")]
        public string telefono { get; set; }
        public List<Kardex> kardexs{get;set;}
    }
}