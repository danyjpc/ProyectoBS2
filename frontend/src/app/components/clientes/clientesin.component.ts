import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { RoleService } from 'src/app/services/roles.service';
import { Persona } from 'src/app/models/persona';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
    selector: 'clientesin',
    templateUrl: 'clientesin.component.html',
})

export class ClientesInComponent implements OnInit{
    //Aca va la declaracion de variables
    public listClientes: Persona[];
    public clientes: boolean = false;
    constructor(
        private router: Router,
        private service: ClienteService
    ){}

    ngOnInit(){
        this.service.findListIn().subscribe(
            items=>{
                this.listClientes= items;
                if(this.listClientes.length ==0){
                    this.clientes = true;
                }
            }, 
            err=>{
                console.log(err);
            }
        );
    }

    crearCliente(){
        this.router.navigate(['/crear-cliente'])
    }

    editarCliente(value){
        this.router.navigate(['/editar-cliente', value.id_persona])
    }   
}