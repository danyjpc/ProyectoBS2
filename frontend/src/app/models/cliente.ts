import { Factura } from './factura';

export class Cliente{
    id_cliente: number; 
    nom_cliente: string; 
    direccion: string; 
    telefono: string; 
    facturas: Array<Factura>;
}