import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/clientes.service';


@Component({
    selector: 'crear-cliente',
    templateUrl: 'crear-cliente.component.html',
})

export class CrearClienteComponent{
    //Aca va la declaracion de variables
    public cliente: Clientes = new Clientes();
    constructor(
        private router: Router,
        private service: ClienteService
    ){}

    guardar(){
        this.cliente.habilitado=1;
        this.service.guardar(this.cliente).subscribe(
            items=>{
                this.router.navigate(['/clientes']);
            }
        );
    }


    
}