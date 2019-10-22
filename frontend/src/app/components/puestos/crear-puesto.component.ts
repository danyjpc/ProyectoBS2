import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Puestos } from 'src/app/models/puesto';
import { PuestosService } from 'src/app/services/puestos.service';


@Component({
    selector: 'crear-puesto',
    templateUrl: 'crear-puesto.component.html',
})

export class CrearPuestoComponent{
    //Aca va la declaracion de variables
    public puesto: Puestos = new Puestos();
    constructor(
        private router: Router,
        private service: PuestosService
    ){}

    guardar(){
        this.puesto.habilitado=1;
        this.service.guardar(this.puesto).subscribe(
            items=>{
                this.router.navigate(['/puestos']);
            }
        );
    }


    
}