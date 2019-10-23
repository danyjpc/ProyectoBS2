import { Factura } from './factura';

export class Clientes{
    id_cliente: number;
    nom_cliente: string;
    direccion: string;
    telefono: string;
    habilitado: number;
    nit: string;
    facturas: Array<Factura>;
}