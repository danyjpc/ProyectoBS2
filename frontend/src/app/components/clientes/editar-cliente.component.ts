import {Component, OnInit} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/roles.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { Persona } from 'src/app/models/persona';


@Component({
    selector: 'editar-cliente',
    templateUrl: 'editar-cliente.component.html',
})

export class EditarClienteComponent implements OnInit{
    //Aca va la declaracion de variables
    public cliente: Persona = new Persona();
    public estado: boolean;
    constructor(
        private router: Router,
        private service: ClienteService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.route.params.subscribe(params => this.cargar(params.id_persona));
    }

    guardar(){
        if(this.estado){
            this.cliente.habilitado=true;
        }else{
            this.cliente.habilitado=false;
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
                    if(this.cliente.habilitado = true){
                        this.estado = true;
                    }else{
                        this.estado = false;
                    }
                }
            );
        
    }


    
}