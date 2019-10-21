using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("tb_producto")]
    public class Producto
    {
        [Key]
        public int id_producto { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string cod_producto { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string nom_producto {get;set;}
        [Column(TypeName = "varchar(150)")]
        public string descripcion {get;set;}
        public decimal costo_compra {get;set;}
        public decimal precio_unitario{get;set;}
        public int cantidad_existente {get;set;}

        public int habilitado { get; set; }
        [ForeignKey("id_categoria")]
        public int id_categoria{get;set;}
        public Categoria categoria {get;set;}
        public List<Detalle_kardex> detalles_kardex{get;set;}
        public List<Detalle_factura> detalles_factura{get;set;}
        public List<Dimension> dimensiones{get;set;}

        
    }
}