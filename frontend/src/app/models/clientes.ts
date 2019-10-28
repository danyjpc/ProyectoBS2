import { Factura } from './factura';

export class Clientes{
    id_cliente: number;
    nom_cliente: string;
    direccion: string;
    telefono: string;
    nit: string;
    habilitado: number;
    
    facturas: Array<Factura>;
}