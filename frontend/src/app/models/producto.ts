import { Categoria } from './categoria';
import { Dimension } from './dimension';
import { Detalle_factura } from './detalle_factura';

export class Producto{
    id_producto: number; 
    cod_producto: string;
<<<<<<< HEAD
    nom_producto: string; 
    descripcion: string; 
    costo_compra: number;
    precio_unitario: number; 
    cantidad_existente: number; 
    id_categoria: number; 
    categoria: Categoria;
    habilitado: boolean;
    //detalles_kardex: Array<Detalle_kardex>;
    detalles_factura: Array<Detalle_factura>;
    dimensiones: Array<Dimension>;
 }
=======
    nom_producto: string;
    descripcion: string;
    costo_compra:number;
    precio_unitario:number;
    cantidad_existente: number;
    habilitado: number;
    id_categoria: number;
}
>>>>>>> 6404f1c7041c5d0729bf5328f6807da44795b30a
