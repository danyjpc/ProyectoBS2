import { Dimension } from './dimension';

export class Unidad_medida{
    id_unidad_medida: number; 
    nom_unidad: string; 
    habilitado: number;
    abreviatura:string; 
    dimensiones: Array<Dimension>;
}