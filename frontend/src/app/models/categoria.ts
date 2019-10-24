import { Producto } from './producto';
 
export class Categoria{
    id_categoria: number; 
    nombre: string; 
    descripcion: string;    
    habilitado: number;
    productos: Array<Producto>;
}