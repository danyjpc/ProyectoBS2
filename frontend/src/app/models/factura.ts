import { Persona } from './persona';

export class Factura{
    id_factura: number; 
    fecha: Date; 
    modo_envio: string; 
    modo_pago: string;
    estado: number; 
    id_usu_cliente: number; 
    id_usu_empleado: number;
    habilitado: number; 
    total: number;
    cliente: Persona;
}