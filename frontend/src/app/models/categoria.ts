import { Producto } from './producto';

export class Categoria{
    id_categoria: number; 
    nombre: string; 
    descripcion: string; 
    productos: Array<Producto>;
}