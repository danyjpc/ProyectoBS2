import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';


@Component({
    selector: 'crear-cliente',
    templateUrl: 'crear-cliente.component.html',
})

export class CrearClienteComponent{
    //Aca va la declaracion de variables
    public cliente: Persona = new Persona();
    constructor(
        private router: Router,
        private service: ClienteService
    ){}

    guardar(){
        this.cliente.habilitado=true;
        this.service.guardar(this.cliente).subscribe(
            items=>{
                this.router.navigate(['/clientes']);
            }
        );
    }


    
}