import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { RoleService } from 'src/app/services/roles.service';
import { Clientes } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
    selector: 'clientes',
    templateUrl: 'clientes.component.html',
})

export class ClientesComponent implements OnInit{
    //Aca va la declaracion de variables
    public listClientes: Clientes[];
    
    constructor(
        private router: Router,
        private service: ClienteService
    ){}

    ngOnInit(){
        this.service.findList().subscribe(
            items=>{
                this.listClientes= items;
                
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
        this.router.navigate(['/editar-cliente', value.id_cliente])
    }   
}