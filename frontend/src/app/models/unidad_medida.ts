import { Dimension } from './dimension';

export class Unidad_medida{
    id_unidad_medida: number; 
    nom_unidad: string; 
    abreviatura:string; 
    dimensiones: Array<Dimension>;
}