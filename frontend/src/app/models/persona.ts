import { User } from './user';

export class Persona
{
    id_persona: number; 
    nom_persona: string; 
    dpi: string; 
    direccion: string; 
    telefono: string; 
    nit: string; 
    habilitado: boolean;
    id_puesto: number; 
    usuarios: Array<User>;
}