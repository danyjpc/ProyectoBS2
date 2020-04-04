import { Categoria } from './categoria';
import { Dimension } from './dimension';
import { Detalle_factura } from './detalle_factura';

export class Producto{
    id_producto: number; 
    cod_producto: string;
    nom_producto: string; 
    descripcion: string; 
    costo_compra: number;
    precio_unitario: number; 
    cantidad_existente: number; 
    stock_minimo: number; 
    stock_maximo: number;
    id_categoria: number; 
    categoria: Categoria;
    habilitado: number;
    //detalles_kardex: Array<Detalle_kardex>;
    detalles_factura: Array<Detalle_factura>;
    dimensiones: Array<Dimension>;
 }
