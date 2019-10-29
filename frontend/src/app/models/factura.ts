import { Detalle_factura } from './detalle_factura';

export class Factura{
    id_factura: number; 
    fecha: Date; 
    estado: number; 
    id_cliente: number; 
    id_empleado: number;
    habilitado: number; 
    total: number;
}