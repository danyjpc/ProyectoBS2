import {Persona} from "./persona";
export class Puestos{
    cod_puesto: number;
    nombre: string; 
    descripcion: string;
    habilitado: number;
    personas: Array<Persona>;
}