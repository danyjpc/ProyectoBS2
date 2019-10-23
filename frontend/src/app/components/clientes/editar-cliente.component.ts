import {Component, OnInit} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { Clientes } from 'src/app/models/clientes';


@Component({
    selector: 'editar-cliente',
    templateUrl: 'editar-cliente.component.html',
})

export class EditarClienteComponent implements OnInit{
    //Aca va la declaracion de variables
    public cliente: Clientes = new Clientes();
    public estado: boolean;
    constructor(
        private router: Router,
        private service: ClienteService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.route.params.subscribe(params => this.cargar(params.id_cliente));
    }

    guardar(){
        if(this.estado){
            this.cliente.habilitado=1;
        }else{
            this.cliente.habilitado=0;
        }
        this.service.editar(this.cliente).subscribe(
            items=>{
                this.router.navigate(['/clientes']);
            }
        );
    }

    cargar(id: number){
            this.service.findbyId(id).subscribe(
                items=>{
                    this.cliente = items;
                    if(this.cliente.habilitado ==1){
                        this.estado = true;
                    }else{
                        this.estado = false;
                    }
                }
            );
        
    }


    
}